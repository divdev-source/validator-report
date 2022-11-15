# validator-report

A javascript Polkadot and Kusama validator performance report generator developed to generate a daily status report for validator operators in the [W3F TVP](https://wiki.polkadot.network/docs/thousand-validators). 
Enhancement requests welcome.

Goals:
- Generate a daily human readable report suitable for Polkadot and Kusama validator operators
- Flag unclaimed payouts to ensure payout automation is working
- **Identify and distinguish organic nomination from W3F TVP nomination**
- semi-heterogeneous redundancy: be a different tool than the one used for payout requests 

## Basic Usage

1. Install [Node.js](https://nodejs.org/en/) \
    This tool developed with Node.js v18.12.1 \
    Many linux distributions offer unsuitably old Node.js packages. Contemporary packages that can be installed in one line avalable from [Nodesource](https://github.com/nodesource/distributions)
2. Install [Polkadadot API](https://polkadot.js.org/docs/api/start/install)
    ```
    npm install @polkadot/api
    ```
3. Get validator-report
    ```
    git clone https://github.com/divdev-source/validator-report
    ```
4. Create validators.json listing all validators to be reported in validator-report/build with the following format:
    ```
    {"VALIDATORS": [
      {
        "stash": "first validator stash address",
        "name": "reference name",
        "network": "polkadot"
      },
      {
        "stash": "second validator stash address",
        "name": "reference name",
        "network": "kusama"
      },
      ...
      {
        "stash": "last validator stash address",
        "name": "reference name",
        "network": "polkadot"
      }
    ]
    }
    ```
    See [example_validators.json](examples/example_validators.json)
    
5. Run report node validator-report/build/validatorReport.js \
    See [example report](examples/example_report)

_validator-report reports the full 84 eras of data available on chain. To report less eras, change ERADEPTH at the top of validatorReport.js_

___
#### See Also - General purpose tools for listing and requesting substrate payouts
- [canontech staking-payouts](https://github.com/canontech/staking-payouts/)
- [stakelink substrate-payctl](https://github.com/stakelink/substrate-payctl)
