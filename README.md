# validator-report

A Polkadot and Kusama validator performance report generator built 
This was developed to generate a daily status report for validator operators in the [W3F TVP](https://wiki.polkadot.network/docs/thousand-validators). 
Enhancement requests welcome.

Goals:
- Generate a daily human readable report suitable for Polkadot and Kusama validator operators
- Flag unclaimed payouts to ensure payout automation is working
- **Identify and distinguish organic nomination from W3F TVP nomination**
- semi-heterogeneous redundancy: be a different tool than the one used for payout requests 

# Basic Usage

1. Install [Node.js](https://nodejs.org/en/)
This tool developed with Node.js v18.12.1
Many linux distributions offer unsuitably old Node.js packages. Contemporary packages that can be installed in one line avalable from [Nodesource](https://github.com/nodesource/distributions)
2. Install Polkadadot API
`npm install @polkadot/api`
3. Get validator-report
`git clone https://github.com/divdev-source/validator-report
4. Create validators.json listing all validators to be reported in validator-report/build with the following format:
```
{"VALIDATORS": [
  {
    "stash": "first polkadot validator stash address",
    "name": "reference name for this validator",
    "network": "polkadot"
  },
  {
    "stash": "second polkadot validator stash address",
    "name": "reference name for this validator",
    "network": "polkadot"
  },
  {
    "stash": "first kusama validator stash address",
    "name": "reference name for this validator",
    "network": "kusama"
  },
  {
    "stash": "second kusama validator stash address",
    "name": "reference name for this validator",
    "network": "kusama"
  }
]
}
```
5. Run report node validator-report/build/validatorReport.js
See [example report](example_report)

__validator-report reports the full 84 eras of data available on chain. To report less eras, change ERADEPTH at the top of validatorReport.js__


## See Also - General purpose tools for listing and requesting substrate payouts
- [canontech staking-payouts](https://github.com/canontech/staking-payouts/)
- [stakelink substrate-payctl](https://github.com/stakelink/substrate-payctl)
