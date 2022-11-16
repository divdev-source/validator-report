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
    
5. Run report `node validator-report/build/validatorReport.js` \
    See [example report](examples/example_report)
    ```
    DOT Active Era: 897
    KSM Active Era: 4451
    
    Validator 154UtMXnexHfUTSvtUZpAfhGi1BejCrRH7YnnGF5faUtaVB5
              polkadot EK-Polkadot1
    
    ERA 824   Stake:2,271,172 (Without W3F 90,255)
    CLAIMED   Era points:60,320 (Average was 47,487)
    
    ERA 825   Stake:2,140,914 (Without W3F 43,011)
    CLAIMED   Era points:59,460 (Average was 47,007)
    ```
    ```
    _______________________________Nomination Details_______________________________
    
    Validator 154UtMXnexHfUTSvtUZpAfhGi1BejCrRH7YnnGF5faUtaVB5
              polkadot EK-Polkadot1
    
    ERA 824
           2,271,172 DOT TOTAL
    96.0%  2,180,917 DOT 16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B
     2.0%     44,692 DOT 1HD6ZdWGjPbMALMbK8JZ4LMjR9ay2avLGzGXUwLKKoHZdip
     0.8%     18,136 DOT 14MWGCk3d11EJRMVHaSFcnkVMrMRuHuCmD63jPY7n7Pfcew1
     0.3%      7,361 DOT self
     0.2%      3,420 DOT 15JBE9fwj3tvCcszmfhF5cfvtrsnrQH72UT27py1Txz2PaE6
     0.1%      2,000 DOT 15BqofHTAWXQnFuKRFH2uCv72uV8xxQWi5wDi3xNZ58USZqe
     0.1%      1,870 DOT 1dsgUcEbyWJ2c1SK9Kf2zz4q4e7ZW9BCrHCcKmBfzPnRtnX
     0.1%      1,786 DOT 16JCiXop8yAURrpaEYossSvPsUdtq3TnQFxxXaSDcq1SncYi
     0.1%      1,188 DOT 1NBKmK2V6JhN3fcr1dW6U7wSwWf4hNU1QBnvGya21JepZV5
     0.0%        811 DOT 15D2QQUpzNCojwSbTq6m5KD7dh5Nh9Cq9uC7z7X4UmkfA3ZH
     0.4%      8,978 DOT Sum of 24 remaining
    ```

_validator-report reports the full 84 eras of data available on chain. To report less eras, change ERADEPTH at the top of validatorReport.js_

___
#### See Also - General purpose tools for listing and requesting substrate payouts
- [canontech staking-payouts](https://github.com/canontech/staking-payouts/)
- [stakelink substrate-payctl](https://github.com/stakelink/substrate-payctl)
