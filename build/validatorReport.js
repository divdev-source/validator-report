//Polkadot ws endpoint to use
const DOTWS = "wss://rpc.polkadot.io";
//Kusama ws endpoint to use
const KSMWS = "wss://kusama-rpc.polkadot.io";
//TVP data sources
const DOTTVPURL = "https://polkadot.w3f.community/candidates";
const KSMTVPURL = "https://kusama.w3f.community/candidates";
//////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS
import BN from "bn.js";
import { ApiPromise, WsProvider } from "@polkadot/api";
//Import listing of W3F TVP nominators
import { W3F } from "./w3f.js";
// Import validators for reporting
// @ts-ignore
import data from "./validators.json" assert { type: "json" };
const VALIDATORS = data.VALIDATORS;
//Polkadot eras are 24 hours and Kusama eras are 6 hours
//Both chains only store 84 eras of data
const ERADEPTH = data.ERADEPTH;
//////////////////////////////////////////////////////////////////////////////////////////
// PROCEDURE
validatorReport().then(() => process.exit());
async function validatorReport() {
    //Node API Connections
    const wsProviderDOT = new WsProvider(DOTWS);
    const wsProviderKSM = new WsProvider(KSMWS);
    const apiDOT = await ApiPromise.create({ provider: wsProviderDOT });
    const apiKSM = await ApiPromise.create({ provider: wsProviderKSM });
    const promiseActiveEraDOT = apiDOT.query.staking.activeEra();
    const promiseActiveEraKSM = apiKSM.query.staking.activeEra();
    const activeEraDOT = (await promiseActiveEraDOT).unwrap().index.toNumber();
    console.log(`DOT Active Era: ${activeEraDOT}`);
    const activeEraKSM = (await promiseActiveEraKSM).unwrap().index.toNumber();
    console.log(`KSM Active Era: ${activeEraKSM}`);
    console.log();
    //Parallel request for data for all validators
    const dotValidators = VALIDATORS.filter((validator) => validator.network === "polkadot");
    const ksmValidators = VALIDATORS.filter((validator) => validator.network === "kusama");
    const promiseKsmTvpData = fetch(KSMTVPURL)
        .then((r) => r.json())
        .catch(() => {
        console.warn("Failed to retrieve TVP KSM data.");
        return undefined;
    });
    const promiseDotTvpData = fetch(DOTTVPURL)
        .then((r) => r.json())
        .catch(() => {
        console.warn("Failed to retrieve TVP DOT data.");
        return undefined;
    });
    let dataset = await Promise.all([
        dotValidators.map((validator) => getAPIData(validator, "DOT", ERADEPTH, activeEraDOT, apiDOT)),
        ksmValidators.map((validator) => getAPIData(validator, "KSM", ERADEPTH, activeEraKSM, apiKSM)),
    ].flat());
    const tvpData = {
        polkadot: await promiseDotTvpData,
        kusama: await promiseKsmTvpData,
    };
    printSummary(dataset, tvpData);
    printNominators(dataset);
}
//Print summary table
//////////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS
//Loop over eras collecting data
async function getAPIData(validator, network, eraDepth, activeEra, api) {
    //Make all data requests in parallel
    let promiseErasStakers = [];
    let promiseOtherNominations = [];
    let promiseErasRewardPoints = [];
    let erasStakers = [];
    let erasRewardPoints = [];
    let nominators = [];
    let otherNominations = [];
    for (let i = 0; i < eraDepth; i++) {
        //Get nominations and assigned stake for the era
        promiseErasStakers[i] = api.query.staking.erasStakers(activeEra - eraDepth + i + 1, validator.stash);
        //Get validator points for the era
        promiseErasRewardPoints[i] =
            api.query.staking.erasRewardPoints(activeEra - eraDepth + i + 1);
        //Get count of other validators nominated by each nominator
        promiseOtherNominations[i] = promiseErasStakers[i].then((erasStakers) => {
            nominators[i] = erasStakers.others.map((record) => record.who.toString());
            return Promise.all(nominators[i].map((nominator) => api.query.staking.nominators(nominator)));
        });
    }
    let promiseLedger = api.query.staking
        .bonded(validator.stash)
        .then((controller) => api.query.staking.ledger(controller.toString()));
    //Wait for all the requests to finish
    erasStakers = await Promise.all(promiseErasStakers);
    erasRewardPoints = await Promise.all(promiseErasRewardPoints);
    otherNominations = await Promise.all(promiseOtherNominations);
    let ledger = await promiseLedger;
    //Fill sparse array so we can use era indexing naturally
    erasStakers = Array(activeEra - eraDepth + 1).concat(erasStakers);
    erasRewardPoints = Array(activeEra - eraDepth + 1).concat(erasRewardPoints);
    nominators = Array(activeEra - eraDepth + 1).concat(nominators);
    otherNominations = Array(activeEra - eraDepth + 1).concat(otherNominations);
    let dataset;
    try {
        dataset = {
            erasStakers: [],
            erasRewardPoints: [],
            nominators: [],
            otherNominations: [],
            ledger: ledger.unwrap(),
            validator: validator,
            network: network,
        };
    }
    catch (error) {
        console.error(error);
        console.error("Failed to retrieve data for validator " + validator.stash);
        console.error("May not be an active validator. Halting report.");
        process.exit();
    }
    //Export any eras with points awarded. Note this sometimes includes eras the validator was not active.
    erasRewardPoints.forEach((x, era) => {
        if (getEraRewardPoints(validator.stash, x)) {
            dataset["erasStakers"][era] = erasStakers[era];
            dataset["erasRewardPoints"][era] = erasRewardPoints[era];
            dataset["nominators"][era] = nominators[era];
            dataset["otherNominations"][era] = otherNominations[era];
        }
    });
    return dataset;
}
function printSummary(dataset, tvpData) {
    //For Each Validator
    dataset.forEach((data) => {
        const planck = getPlanck(data.network);
        process.stdout.write(`Validator ${data["validator"].stash}\n`);
        process.stdout.write(`          ${data["validator"].network}`);
        process.stdout.write(` ${data["validator"].name}\n`);
        let tvpIdx = -1;
        if (tvpData[data["validator"].network]) {
            tvpIdx = tvpData[data["validator"].network].findIndex((v) => v["stash"] == data["validator"].stash);
        }
        if (tvpIdx > -1) {
            process.stdout.write(`          TVP Rank: ${tvpData[data["validator"].network][tvpIdx].rank}`);
            process.stdout.write(` Nomination Order: ${tvpIdx}`);
            process.stdout.write(` Self-bond Points: ${tvpData[data["validator"].network][tvpIdx].score.bonded.toFixed(1)}`);
            process.stdout.write(`\n`);
        }
        process.stdout.write(`\n`);
        //For Each Era
        data["erasStakers"].forEach((erasStakers, era) => {
            process.stdout.write(`ERA ${era.toString().padEnd(5)} Stake:`);
            let totalStake = erasStakers.total.unwrap().div(planck).toString();
            process.stdout.write(Number(totalStake).toLocaleString("en-US"));
            process.stdout.write(` (Without W3F `);
            let organicStake = erasStakers.total
                .unwrap()
                .sub(getW3Fstake(erasStakers))
                .div(planck)
                .toString();
            process.stdout.write(Number(organicStake).toLocaleString("en-US"));
            process.stdout.write(")");
            process.stdout.write("\n");
            let claimedEras = data["ledger"].claimedRewards.toArray().toString();
            if (claimedEras.includes(era.toString()))
                process.stdout.write("CLAIMED  ");
            else
                process.stdout.write("UNCLAIMED");
            process.stdout.write(" Era points:");
            let eraPoints = getEraRewardPoints(data["validator"].stash, data["erasRewardPoints"][era]);
            process.stdout.write(Number(eraPoints).toLocaleString("en-US"));
            process.stdout.write(" (Average was ");
            let eraValidatorCount = new BN(data["erasRewardPoints"][era].individual.size);
            let avgPoints = data["erasRewardPoints"][era].total
                .div(eraValidatorCount)
                .toString();
            process.stdout.write(Number(avgPoints).toLocaleString("en-US"));
            process.stdout.write(")");
            process.stdout.write("\n\n");
        });
        process.stdout.write("\n");
    });
}
function printNominators(dataset) {
    process.stdout.write("".padStart(31, "_"));
    process.stdout.write("Nomination Details");
    process.stdout.write("".padStart(31, "_"));
    process.stdout.write("\n\n");
    //For Each Validator
    dataset.forEach((data) => {
        process.stdout.write(`Validator ${data["validator"].stash}\n`);
        process.stdout.write(`          ${data["validator"].network}`);
        process.stdout.write(` ${data["validator"].name}\n\n`);
        //For Each Era
        data["erasStakers"].forEach((erasStakers, era) => {
            process.stdout.write(`ERA ${era}\n`);
            process.stdout.write("APPLIED".padStart(11 + 5) + "EFFECTIVE".padStart(11) + "\n");
            let nominations = getNominations(erasStakers, getPlanck(data["network"]));
            nominations.forEach(function (n) {
                if (n.share < 100) {
                    process.stdout.write(n.share
                        .toLocaleString("en-US", {
                        maximumFractionDigits: 1,
                        minimumFractionDigits: 1,
                    })
                        .padStart(4));
                    process.stdout.write("%");
                }
                else {
                    process.stdout.write("".padStart(5));
                }
                process.stdout.write(n.stake.toLocaleString("en-US").padStart(11));
                // Effective stake is nominator total/# of nominated validators
                // Based on present # of nominated validators, may have been different in the past
                let ni = data.nominators[era].indexOf(n.id);
                let tmpStr = "-".padStart(11);
                if (ni > -1) {
                    try {
                        let otherNomCount = data.otherNominations[era][ni].unwrap()["targets"].length;
                        tmpStr = Math.round(n.stake / otherNomCount)
                            .toLocaleString("en-US")
                            .padStart(11);
                    }
                    catch { }
                }
                process.stdout.write(tmpStr);
                process.stdout.write(` ${data["network"]} `);
                process.stdout.write(n.id);
                process.stdout.write("\n");
            });
            process.stdout.write("\n");
        });
        process.stdout.write("\n");
    });
}
//Identify what stake is from W3F based on W3F const array
function getW3Fstake(erasStakers) {
    let W3Fstake = new BN(0);
    erasStakers.others.forEach((other) => {
        if (W3F.includes(other.who.toString())) {
            W3Fstake.iadd(other.value.unwrap());
        }
    });
    return W3Fstake;
}
//Is this datatype broken? Rolled my own getter.
function getEraRewardPoints(stash, erasRewardPoints) {
    let points = 0;
    erasRewardPoints.individual.forEach((record, validator) => {
        if (stash === validator.toString()) {
            points = record.toString();
        }
    });
    return points;
}
//Extract nominations from an era and sort them
function getNominations(erasStakers, planck) {
    let total = erasStakers.total.unwrap().div(planck).toNumber();
    //let nominations: NomData[] = Array;
    let nominations = [];
    nominations.push({
        id: "self",
        stake: erasStakers.own.unwrap().div(planck).toNumber(),
        share: (100 * erasStakers.own.unwrap().div(planck).toNumber()) / total,
    });
    erasStakers.others.forEach(function (record) {
        nominations.push({
            id: record.who.toString(),
            stake: record.value.unwrap().div(planck).toNumber(),
            share: (100 * record.value.unwrap().div(planck).toNumber()) / total,
        });
    });
    nominations.sort(function (a, b) {
        if (a.stake > b.stake)
            return -1;
        if (a.stake < b.stake)
            return 1;
        return 0;
    });
    //Compress everything after top 9
    const onlyShowTop = 10;
    if (nominations.length > onlyShowTop) {
        nominations[onlyShowTop].id = "Sum of "
            .concat((nominations.length - 10).toString())
            .concat(" remaining");
        while (nominations.length > onlyShowTop + 1) {
            let last = nominations.pop();
            nominations[onlyShowTop].stake += last.stake;
            nominations[onlyShowTop].share += last.share;
        }
    }
    //Add top line Total
    nominations.unshift({ id: "TOTAL", stake: total, share: 100 });
    return nominations;
}
//Get currency scalar for validator network
//See https://wiki.polkadot.network/docs/learn-DOT
function getPlanck(network) {
    if (network === "polkadot" || network === "DOT")
        return new BN(10 ** 10);
    else if (network === "kusama" || network === "KSM")
        return new BN(10 ** 12);
    else
        return new BN(1);
}
