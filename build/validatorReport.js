//Polkadot ws endpoint to use
const DOTWS = "wss://rpc.polkadot.io";
//Kusama ws endpoint to use
const KSMWS = "wss://kusama-rpc.polkadot.io";
//Polkadot eras are 24 hours and Kusama eras are 6 hours
//Both chains only store 84 eras of data
const ERADEPTH = 84;
//W3F's 1kV Nominators retrieved Nov 10, 2022
const W3F = [
    //DOT stashes from https://wiki.polkadot.network/docs/thousand-validators
    "14Ns6kKbCoka3MS4Hn6b7oRw9fFejG8RH5rq5j63cWUfpPDJ",
    "12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y",
    "16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B",
    "13yk62yQYctYsRPXDFvC5WzBtanAsHDasenooLAxKvf5bNkK",
    //DOT stashes from https://polkadot.w3f.community/nominators
    "154UtMXnexHfUTSvtUZpAfhGi1BejCrRH7YnnGF5faUtaVB5",
    "1y6CPLgccsysCEii3M7jQF834GZsz9A3HMcZz3w7RjGPpBL",
    "12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y",
    "13yk62yQYctYsRPXDFvC5WzBtanAsHDasenooLAxKvf5bNkK",
    "155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db",
    "13GtCixw3EZARj52CVbKLrsAzyc7dmmYhDV6quS5yeVCfnh1",
    "16KjnbCmBXqT3R956sHak7THsgQZ9Ek8ibnG1sFyCNtfJ8y",
    "129pBPe7kDfuJjdwNHYaT1a8K65fVR5RWjog8xmVYmoQp4zz",
    "13YJ7PrjwAhKHP9m99APDSuvLwWKSQSmKABfJY3H2Cepk2CA",
    "1NebF2xZHb4TJJpiqZZ3reeTo8dZov6LZ49qZqcHHbsmHfo",
    "16Ar9KjX2LQf2CdTrTxbyxPjDNswhL7qPhnwcr8ocMynBRWo",
    "12pJGRmrWoZohZVFnGK2hhoMwzCVkjmEjwv3C5wxdnbCAiEk",
    "15BQUqtqhmqJPyvvEH5GYyWffXWKuAgoSUHuG1UeNdb8oDNT",
    "16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B",
    "13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em",
    "1311nP52HPRLCvSS4EXgWfqRfXnjexbr7t82aedpWpGCPnxV",
    "14AngS6QiZvC4AxvWFw7wXwzmctRGL7aWWriococE6rmhKqb",
    "13pZskDR7Pt67NtcChSr4uFRBf9ZS52nQeyrceSykq8MDrMe",
    "152QidDC4QrtMCyRGiQmvrNyjntvMg2XouCSdoPSeqUNTvsq",
    "1pnNeueeo2QTr72PXirhUUjdPniysKYETik5orGeq1BFAoU",
    "14AakQ4jAmr2ytcrhfmaiHMpj5F9cR6wK1jRrdfC3N1oTbUz",
    "1bjtWMjjq4GLDQhaWT9Y2wDcWqcQ83gYbfdvECQF5WDA23A",
    "15tfUt4iQNjMyhZiJGBf4EpETE2KqtW1nfJwbBT1MvWjvcK9",
    "12bLdVAgWiKHgFHtAaQstasMUWVq35oG9iwHCwsKoFFNoNrk",
    "1mx9gKS9DE4H9dvyxCWKMvuKw8bTDu2cgCcFbKNAhYHwyjD",
    "1557x4U7JTAcso9AHpiVfrEsadABQ2swNWhDeh5WvUn9Zdog",
    "14Ns6kKbCoka3MS4Hn6b7oRw9fFejG8RH5rq5j63cWUfpPDJ",
    //KSM stashes from https://guide.kusama.network/docs/thousand-validators/
    "G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf",
    "HgTtJusFEn2gmMmB5wmJDnMRXKD6dzqCpNR7a99kkQ7BNvX",
    "EX9uchmfeSqKTM7cMMg8DkH49XV8i4R7a7rqCn8btpZBHDP",
    //KSM stashed from https://kusama.w3f.community/nominators
    "HptkY9mWWng22WSUAfYTNf77vWf9NJ6Bk8yKGHcRWr6od7u",
    "FPc6HXzVyCbsarcyLEN6UnHbhWxdUputwEe5saQxmMUj63X",
    "JA9TjkzZzsJnBC8igbnLZ2WYvgsYHd6fu54QJAViqnADoZq",
    "GkmDg8scrddPXTuahbnU76GdAjjfJL6ESq1Nzs9uHQnSkyR",
    "DxAH1AA2rGbmJJ3CdU5AabEdkH8baixApDSZ2CgVtjehb7v",
    "GLdbdQ1E5kM73RN6d8Z1SW7auyneEpp99rxp49ziDaz535B",
    "Ht6FbjRKCZ4HW2dNd9w2AtYsed2cHDQTPWXdE2Qm1FQMU4e",
    "Cz4uW9PwEgqFwyjRBiSWY4AzXzuxc1dWjoLDd3QieVaZoD4",
    "ExWRdMwU8JLrfaQvGJ6TxhtTbxjCtcLhbVQoSXLANywK6uo",
    "GSB74xfhCEe9tE76uXFFVWby9LDsHH3NiTs74gVdmQwy7Mu",
    "F8H3cT1XKWHbkWSRhyVbRgpqn1nLhXGCL1uUdXQJmavpACQ",
    "DGm5ntY1Cifr427BKhFXtVyCgxEW7cbg7xqX7Y8pEYaGt3c",
    "GeSU3Yv52v5Bux66tUYRemisbSmWQ8ykPoUt4N7rBy88LxM",
    "FwbSJotQLAyp7NANvtJESMmS1N921qW3bMQj4k2CqfNi4vf",
    "JKNej76pMhqG3fdAQNPKXJPS1rgBWebe2d4jgvYCU6CvRf1",
    "FFvhijZofjqZEXwE2hvpKHbyNDexDHq3Qk1ti7SaCmYTRF5",
    "CwPFXLx7NmPRsQyAFTBscxK7Ph1sJ9Ngekc6rXMxTwdw5PZ",
    "F8FswEGD1quEyNciuR9KwsragUmqnk7mFLqmAdRdnY9Sdwx",
    "HQuPha82sRy91zZn73XRGJVV3ernBh5HZKftUcoDT8CSUwK",
    "DtTJsf4mZogU7ZkXXUtSTPPeuiT77mBvCPTpsdAduJX7EXu",
    "Dek7ze8nGoTWpuperdvx6nmyZtb41CQN97ypX9enfT9jM5S",
    "FJcnsNkMjY8tgJrDVeq5CKoB1b4Au2xGQjaMv8Ax5QAiV6p",
    "EtN5SSSbQK5dPq1P2Baqp1sdFjFCFFjrhKpQ53Ap8gLLPCi",
    "DZzMSwXzbxhnCJePpzRKs1GD3yX25LP91y2Q9kFmPHXQ1vY",
    "HgujxWHszAvuTfqfqXAxKE69XkMRtvhF8StRTVAFK6uwAZS",
    "EVgkDV9X4BmnMi3ZNgrkKW3WEiaZ6wqE1HVRZziNnERmyfi",
    "FkrektytDeepNHKZMMiPYZsrmgrVum9cqZmE4fsz4cotKs9",
    "FqY3mdSf8ZxcBVvjzkbBLgP3XLbA2ikPrExtiWFpidkjPct",
    "GefTiMd4roQrRkJzurdLdGsoAUkmMkiGoYd6Cvu5oqCgamX",
    "G2s9C6arpTHUVASRYU8vBCxEyTDYj1mQcKu3LioyRsRpHNV",
    "HvumdQbk47PXTz57UDrZP5n8rmgf27upC1ooPjtZf9XA2Wk",
    "Gh86VtoTd3c5fGvCjSRhymndg8AUpR4NZAit8XVGCv985Wf",
    "DqsZ7nrch8Ro9HqP1ZX7CbbpZFWy2V4bWjWWjNA2PAehZsW",
    "D5WxiuCkRfGrFpRjH4uvmjdUQYH6bvHXiUVYp4eRnr7E1DA",
    "HChjf62FddBkgfkYMr5E2ejjAeRNEsXDZC677JKgMhxeBBW",
    "CmWzMp9is3LgQFWY6qtvkEUft57NXVVbXxKxarHjxPCrTtu",
    "HyLisujX7Cr6D7xzb6qadFdedLt8hmArB6ZVGJ6xsCUHqmx",
    "FZ1GFKR6tYx9gNGHV67h5aV6bfhAbh7ZRdU9ypVvXfseyfg",
    "D5xebnhvC1DNuJ4LckoYWj8kvaKuqZ7UzNucogn89p6wRJv",
    "HxRmQTVrMxMkhyZquYLu2hSL1QDYvVwSpDfBHvVJhEMVzRj",
    "Drb5XkyGvm26ph6d1DE4wxbwqiUCKyVXpcThBUSHE4VxrB7",
    "FAR296Aqh9i8W5bi7BS7a8Bkhbw5LX5xCXP22c1Jvc2tM5v",
    "DN2oxCHnJviLK1NoYdzSNo9n9gmH3eBTfLGXSUcoFcq5khX",
    "HTiHYfSRCkUn5u58KRHWjkNPRPP1MNahuXdEr2TtJ5xXfZU",
    "GZPJSqoN3u49yyAZfcxtfHxBDrvxJ79BfZe2Q9aQvv2HrAN",
    "FSRywMqAT92LJ8ihaQ7w1N8dXvLau53nEQx3EmNdGns2QAY",
    "EygmNkGy9vnTsM3wkHLYBt212TJPLDDptVQxuhfihggdkTY",
    "HZZL1WsAkN8LLd1oFetTzxWGaz3kiVnDNmnC6gkeryBz5xp",
    "ES61whRwU1AgXx7zbq9KxK2SiuWtiLWbXKowsqLraa8WC9A",
    "FUyY55mx5zavpkETx3Na9wi421eJ7rhijoRmXWNCBHUik8Q",
    "D8cKfwmQDrQMTAQgHseH6ysLXH4BY9hRBzvQ3bbVuMxXpam",
    "GsW7NAUcWMQ92Ata4QjJ1vNHN3PrgvUbLe5T2RXtjxvUXLL",
    "GEw8S2PmLaoU5hR8uR6Mjczhr36gPb6ZYLiYb9h74e7bSa2",
    "FZfG7K9Yx7qwHHV9xnaUhnxeUziSCHmcB6K5THZaGuuTdXw",
    "HWWqWaUVzsKjUWndXRhvyXhm9C5MevEXk74CXfdE6XbBok9",
    "EK2yYS2xW96AGZaCn21Xcwdp5xzQVAe6VmoSpSYLg7ZvmmV",
    "EARQCUK4Y3oN3LCuyjriBxPesNAuQWa7ifjsfNSU6srpFAq",
    "HFdL9ybuAzsAH6BzsTNgeCBZ4Vs6s1fzDjGqLovpYBhrf1h",
    "DG1TPMPi6haZsUUgXSoMwNsUW198EXBu7Wd7EGU1KdfEag1",
    "EmAFBdRFbJiyThqSt9vv2vVECcdTU9nJqa3wTxgKCVKMoC4",
    "GRTHCT1fNRgbqMURtEDuZPBbQ7tHcgt3swzdmGNk1MKchqL",
    "FciYrHePA2d5jYXHy3T8gEE6Fh1XjSYWyqKkV8cVrpqAypr",
    "HnZafcsErZXmc6gUupBDzNVayTQbraN5fvzoC7XYKev8f5q",
    "Gtbui8rCwSBKn3v2RdmD2z7TKUCnCChtARmTwQi34ngGZmK",
    "DPoJe9z9k36jJpCj32K6m2eT6DAnwvkrUsUkXHnRXWiEuyY",
    "GLxyY9cx27VkZNrf33zHURwLLa58jU8XZeg8HDWkNpX2JXS",
    "GtRQd4YsEJiHWyWws5yBCMLhWPTUELHVQEDFRCvfPMfnWKW",
    "DwWqJJaEZCnLkaH8sPPYDhTS1nE7jvHiD1VEVGS3Hg54UDF",
    "FffWuApGjFgHikQWG6ivzJxzRnwqRAgu8dTME3tuv5pBNZ9",
    "HCogweijHTm85qf9cSUqjNmyZZvu61r4SsTcsAT7S7pgpem",
    "FZyFBAqs93TenupzDHJzW1pxFLxwwo1EJLvT89jhrV368yb",
    "CroiANffLtjz44LXp98NqmLxuUW5xxbsruZiRUXdeGFD82a",
    "EBj7AAN5Q3MsQiQwMdqH9Mp5RbeDAr2MTgFdkdgMSaq6ecn",
    "FVAFUJhJy9tj1X4PaEXX3tDzjaBEVsVunABAdsDMD4ZYmWA",
    "JKzwkX6JcARutZvJpArnUFZnYnbsZedCTJfbhrqTtPuxezU",
    "Cad3MXUdmKLPyosPJ67ZhkQh7CjKjBFvb4hyjuNwnfaAGG5",
    "HRvhZa1T6WwApvJrjiiqLf3W5WfjggoU9664pWxEpYNcXdS",
    "CfrvyqdQZSaQdvFvjEv9Rbyi225PmTefffqteNvSTCJg3Vq",
    "EctdZvgkphLJMQmKntaPP74LKpGvDKaj1cbqC8fUT4HzqiC",
    "DXo9ZVunhLbLoXFGipMimLP9T5JXWiFh7KdERqvene8nsqs",
    "Dff4bQQLGsNbF5iAnsjE9bmTd4oxhmnYJXHnhwBLBjC8aBo",
    "J4mt2MknXc8AsLHt5M6pzFD1odT9sZrufEHyCPjbm8FafJd",
    "FRyidReK7r5Uq49nbQnGvngMWuLWngzSf9SCbqgAMYQWXNe",
    "Eh7owDC9WRj3gUWMHLTYEN18aarNqSa7kguRGuxa8gBr5Zp",
    "EiiSBrZ9kPJhPwf114LF6DyrHCLSKucFTS2TPpSH7zWkTTG",
    "EwR2jzx7gZSjxCXbkVZRm39W2fWGJtwXYYftQYdVfcJjtt4",
    "FmxYyX53X8uyjSHXf6Lz21dd3LfUm43Fia1yN2hXayefmqj",
    "ELuVvnp16AqbCKFZmwMsZSFEV4hGgQLRRxTYtqTkiRyLw65",
    "JLQDhDpU3Z1uUfdMQUoKXambPuDsYFdbcZybDF2yME8aVNa",
    "GwGCd3XM5qCExnPJT6wyAqygNRZQL9Tqta3txfswnUsEJWr",
    "EfeoSg3WEZo5kp3BKfwhwwJkh4GdSaS9MjaeH2nKREDovzw",
    "EVhWhw6w6i5C9SV3FbHdM1rroTxsM5UzxEKMyXCwnct2EnH",
    "CmjHFdR59QAZMuyjDF5Sn4mwTgGbKMH2cErUFuf6UT51UwS",
    "EXGbhMrQubm7pRkUSkTEGi2rmR764ZM7kStfCRo2cZYa8VE",
    "HZU7Hkai2LZkP6BRCUEWiGSkhaNJoaPgroYEKtKkMHwTTY6",
    "CyzTh1chfwDa5GuBDfE3BC7e1H7Jnvoz21gf79ckeMJ7xeg",
    "JHwBvr7JeNXW8S8JL7wumsvqYZ8Kf2W1xrYn5nS1Z8p81VL",
    "HHHyHUy3kKpWQt2o47NdDxHAPHg6rXMHsAZjCSbS5rvpStY",
    "ESM8k6WhtMu8gotAkmuNrGhrG9RR7mAfvLARyif9Gqjvu2P",
    "EHAgisQqE3paxAC694qumC9QLmGSJTRT1vEMJ8FUK744ixS",
    "HbU6yWNQp188SsrKtfrq9ZzJFhjjQisyFjcVxRp25ZPrB8M",
    "DBdn3d5cWg8yfa3u7LsJdjxyrGxNfWoieWdrNGGrsivmbZk",
    "D3bm5eAeiRezwZp4tWTX4sZN3u8nXy2Fo21U59smznYHu3F",
    "FCUvpYbs2H7Dch98wenjHxDYkjn4DiSV3MQuryARPjpWfHd",
    "EaQghcv5V7uFSvj1yHgXxnhTy7y7KP7Lfgms1rvQqbwXBZN",
    "DPuG89deqMcPAbPBYsbonzFrMAzZgTmBxmMNuH5LiQxcu7X",
    "Cdhjt72TSezVDkUzdgyoSwXByfwQJjuXSYcDs5L8snyB8Yx",
    "H4635Bjj3X7TjnQhd55p9DyFPK39JiRypmCnsDhS3NHSMS5",
    "G5hwBggY54Bm3hSo1wgrsTwkXuDkD5Juh73R6PiGGEmo1PS",
    "GNYcq54aXW3PuZ6mJnNzuV9AfYrJhL7HJ5svCEzn1XTuov8",
    "HG1dCdm3oBZVppZijoCfT3hVygPaEeYLrJRgHt3bU4YQ5yy",
    "GD6MTUJG9Ym7tS6PLF42yreHpqpvFgPcqPwcyRGiMv2TSGR",
    "HUE5nUANxvCRW7SoLAHcKdB2PLoUpUVyuSdviHrKKQAV5EC",
    "DPb2z99bbieLXWADo1dsLTijTc84vktx5nZmu79NztbC3NS",
    "Fynn5CRPtc8xH1gM5emZoRkXEZstrJE3ixmtNqTKa9yaV56",
    "EiMA69PZWju1jmisAU3ubN4wJQgBexnFXZpWb7aMtftP5rV",
    "EfeoSg3WEZo5kp3BKfwhwwJkh4GdSaS9MjaeH2nKREDovzw",
    "Cx8jJMMwTcEwTMHSQDdwTwFJCmmTsMVz25auV95WkFBZnZv",
    "ES61whRwU1AgXx7zbq9KxK2SiuWtiLWbXKowsqLraa8WC9A",
    "EygmNkGy9vnTsM3wkHLYBt212TJPLDDptVQxuhfihggdkTY",
    "JMkSXXco4mxTRXNyRgYqeNpRZDXZ3i1qdKMP5FoMphCE6fq",
    "DBdn3d5cWg8yfa3u7LsJdjxyrGxNfWoieWdrNGGrsivmbZk",
    "E2TW64quCycBc43q5xcu3h1m3eMGGijN7CFHYvSh9KzZVwA",
    "JKzwkX6JcARutZvJpArnUFZnYnbsZedCTJfbhrqTtPuxezU",
    "DPoJe9z9k36jJpCj32K6m2eT6DAnwvkrUsUkXHnRXWiEuyY",
    "J7XHBQxacqTTVkoNoSgcG6CgREb9JVh2DHBbBQ1ycvkLBq4",
    "GNYcq54aXW3PuZ6mJnNzuV9AfYrJhL7HJ5svCEzn1XTuov8",
    "Cad3MXUdmKLPyosPJ67ZhkQh7CjKjBFvb4hyjuNwnfaAGG5",
    "G5hwBggY54Bm3hSo1wgrsTwkXuDkD5Juh73R6PiGGEmo1PS",
    "EctdZvgkphLJMQmKntaPP74LKpGvDKaj1cbqC8fUT4HzqiC",
    "EK2yYS2xW96AGZaCn21Xcwdp5xzQVAe6VmoSpSYLg7ZvmmV",
    "Ff3xdNrXA47svhiTJHj9uNhxLo29PYjYcJ9cUseAd9FK6iQ",
    "Ew4JDQENKYKdBkgW6bJfFqYYXaDw4kupXBrXyMcJoU6Lc9Z",
    "G1rrUNQSk7CjjEmLSGcpNu72tVtyzbWdUvgmSer9eBitXWf",
    "EPVX8ZxarAfG4o9PN6yUnkSaP4jA3b6Nj6irnDApixMMeWY",
    "DNDBcYD8zzqAoZEtgNzouVp2sVxsvqzD4UdB5WrAUwjqpL8",
    "DaNCiojAyKWjXDLxiHLrpMvD36hgKpvrYD3Xqf31RNDqXKT",
    "GM31KcErdS3ob8wmFSbLycccJ6YGvvTXLBAawd6d9wkAxqj",
    "JHUdcxgy5dhLFu8wXmskpSLnrXH1ue9rYG7oQFUDPqxzX3u",
    "HFTeZuZ62eRLGgjXgpDKQE7H3GDNE8zVfofJ1sr2DEsKLpL",
    "Ew4JDQENKYKdBkgW6bJfFqYYXaDw4kupXBrXyMcJoU6Lc9Z",
    "DDdwYhRXzGWBvvaqMEQ7acJs21FiB96L7nnJZfq6HxseFxW",
    "H8FCosmkRAgDevcgEppkgcmZLLurh3otcXsyeSZdWDHNJwf",
    "HnidBVNsn5MdboWwHRRoVHuzzFEZZFgenQb3KmgEoRt3tTJ",
    "Gtbui8rCwSBKn3v2RdmD2z7TKUCnCChtARmTwQi34ngGZmK",
    "GPXThfrRtVwyLu5q788nq9zUiKVRHwX4z6quSdN2vRg1Ww4",
    "DzGfdX9G594Txpo7skHw3GgKjFTE9CrRPfXQ2VdRpYPbS6S",
    "G4ZLdEFaJBK7BfikyUCHuJ5ttmuivAeGihnGFWX1VDgDteE",
    "HZU7Hkai2LZkP6BRCUEWiGSkhaNJoaPgroYEKtKkMHwTTY6",
    "EaQghcv5V7uFSvj1yHgXxnhTy7y7KP7Lfgms1rvQqbwXBZN",
    "HU6TSsvA84GKrTiyArBHiFDVBSLHNr5Ki3qPV7T8WKyVJaz",
    "Dm64aaAUyy5dvYCSmyzz3njGrWrVaki9F6BvUDSYjDDoqR2",
    "D6NNbc18fTh4WVQtmrTyLRHGv8SKVtjKFY8uV34k5ydBMaV",
    "FHsDBsDmxzsANzvDrPBCzxyRAAYuTHCoe5d6vzi2qEdTBKk",
    "EDeGMwoAZ3SQwcGSb5oLPxSqNCYLCMHrfw4gJ9CM8Gr9XiA",
    "HnR4exC2rBF6MCGVQSH1tdf6UppPvnz8CLNSVCL3VPR4mzQ",
    "FmxYyX53X8uyjSHXf6Lz21dd3LfUm43Fia1yN2hXayefmqj",
    "GUw3gm93T85i9Syb4hA3NotNMFgCB56p7osxi3hnoqforMj",
    "Dq97kmsJXGTciU1eMXZMAp4D41Y9e7kQ4hmFBfZW7YD4CCf",
    "JDEgrmpP97qu8UoTjm2Ra8wJUrXFrunabsnyQ2bZRspf9r6",
    "EUWaPzJV9soamnUPSUcp76mEjQkLZj4nt659DvdVzRG9k6a",
    "GPTwmqixpfnum8jCBVmYBYnseb8q6g9b4kxWRRuuRTAqMoX",
    "Hf8C626KBAjitMV7w8AhQWDCiPgUU47htEwbomq5mDMKeyL",
    "FDSK4DywqKzDweKQe7QyWEtAasMLWnxLzQWY2EY8YNW6G32",
    "HgTtJusFEn2gmMmB5wmJDnMRXKD6dzqCpNR7a99kkQ7BNvX",
    "JLENz97TFT2kYaQmyCSEnBsK8VhaDZNmYATfsLCHyLF6Gzu",
    "HsoF56BFCDgvWtuJ8TcmMgvJ6QTRfWwJauRuUM13qRFfQpp",
    "EDNEfKXHd645DPpBhLZjaEwp4sPhj4STjjS4QrMbFU1FqbZ",
    "DiCVJt4fNZTmsxRSi7J3dDVMTDsCV7k9BG9ray5Yt5WJoMD",
    "EiiSBrZ9kPJhPwf114LF6DyrHCLSKucFTS2TPpSH7zWkTTG",
    "FJeLXJd6BSkhye8fY6GzVXmog6NLZfb7u3M6ZnJaHAr4eJc",
    "GM31KcErdS3ob8wmFSbLycccJ6YGvvTXLBAawd6d9wkAxqj",
    "DPb2z99bbieLXWADo1dsLTijTc84vktx5nZmu79NztbC3NS",
    "J4hAvZoHCviZSoPHoSwLida8cEkZR1NXJcGrcfx9saHTk7D",
    "J4XkgJjMP6c1pqneV5KogJvJLM1qReXP9SAMJt33prnDdwB",
    "J12kKQz1qcCHBg36Txz2k9mNKYERhjKRRSshwUghT11medm",
    "FqFKeVrWbBDVBk8U9VvL8gSFwUm4nj9fEZmtQvmViZzLvnv",
    "EAqxvPZ3nxyfum6d8DFBeGuykQayJHtE6DyCcHMyd6o57WZ",
    "D8cKfwmQDrQMTAQgHseH6ysLXH4BY9hRBzvQ3bbVuMxXpam",
    "GL7MYnpQr7jgJqK8wSRUQuob1TvTY7uRJP6LUNeUyvMUhQR",
    "FcjmeNzPk3vgdENm1rHeiMCxFK96beUoi2kb59FmCoZtkGF",
    "FRyidReK7r5Uq49nbQnGvngMWuLWngzSf9SCbqgAMYQWXNe",
    "FLdSKZjwaVuLpR2aPRi5csvsWgV6ZA3vZu58qx36oXukM63",
    "EcaQjvT1QFnsxevgfGud8C33N1f6oQCNqLdcjmRZ8ksAZyh",
    "JCHVzJjBWS1ZxkTZJN1jifYrDcspepCU2YCW23XhtVQnYE7",
    "DBfT2GUqHX89afMhTzGCCbAc44zX33d4XySWX2qAPxZ35KE",
    "EwaMZ7Qt9iuGPXEV1N39784XhhBVSepE9EUfEsbhLwTncZo",
    "FUbMLUvMq3tnJK7jX8TaZmRCX9yRqEFNLsKK3K1UtfZw16v",
    "DJN9riW92EEyZFHNthLCRmc8BrC3MDGiiVKCpHX8qcizcmV",
    "GC8fuEZG4E5epGf5KGXtcDfvrc6HXE7GJ5YnbiqSpqdQYLg",
    "EHs5p1TR3SpQXvqAUq7pL4qKWRVNmrvtCT4izncvnk6Kh5W",
    "HNGMhUpVnZjuJ3kQcBAMF4KVywdkk2SCxQ4TAt6QBKtMCFh",
    "Dtf5sKpKrQ3mc9SK1WmRTR3oaKyAS3p27LEeWCLPF6gsDuU",
    "DVw4Zkfva2MPibAsr8vgoha1T2ow8zreoTWGyBDioQBdfMM",
    "FZsMKYHoQG1dAVhXBMyC7aYFYpASoBrrMYsAn1gJJUAueZX",
    "CmjHFdR59QAZMuyjDF5Sn4mwTgGbKMH2cErUFuf6UT51UwS",
    "GfFsEud27Ag4ngnZ1CehjYm7t6jJYauVV43ncssbfRVdTUK",
    "GUukavjKxAdj4Cb77DiwyNNhCSZ6H4RaSiRqYo1uaYiSWcM",
    "FLMHZJ2arv1K6Cz9E7j5PJcxLvR2AmD5QsRk6kG4XdFxsz5",
    "HFTeZuZ62eRLGgjXgpDKQE7H3GDNE8zVfofJ1sr2DEsKLpL",
    "FWrLZd5xpb3hxjqUTdXcpRoww6w6pBkkbVYxdxkSNycuvXJ",
    "CzFKweXiC853a3mrxJFbbmevZpT4i7Yy1iNuwdXZYm4wnqE",
    "JHEo3pB2dBhdHB17AFTtbaeXkeyeE1u87QGZiv2X23SWTr3",
    "Ffd5sG7N65LEFr4bXbpwvPnpmezwpfrCVDEozH2jkMs1utk",
    "HQsZbKE5CatSBgQB1LHws8eZJs3qjV2VB5cxkUyZHagG9oW",
    "EX9uchmfeSqKTM7cMMg8DkH49XV8i4R7a7rqCn8btpZBHDP",
];
//////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS
import BN from "bn.js";
import { ApiPromise, WsProvider } from "@polkadot/api";
import data from "./validators.json" assert { type: "json" };
const VALIDATORS = data.VALIDATORS;
//////////////////////////////////////////////////////////////////////////////////////////
// PROCEDURE
validatorReport().then(() => process.exit());
async function validatorReport() {
    //Node API Connections
    const wsProviderDOT = new WsProvider(DOTWS);
    const wsProviderKSM = new WsProvider(KSMWS);
    const apiDOT = await ApiPromise.create({ provider: wsProviderDOT });
    const apiKSM = await ApiPromise.create({ provider: wsProviderKSM });
    const promiesActiveEraDOT = apiDOT.query.staking.activeEra();
    const promiseActiveEraKSM = apiKSM.query.staking.activeEra();
    const activeEraDOT = (await promiesActiveEraDOT).unwrap().index.toNumber();
    console.log(`DOT Active Era: ${activeEraDOT}`);
    const activeEraKSM = (await promiseActiveEraKSM).unwrap().index.toNumber();
    console.log(`KSM Active Era: ${activeEraKSM}`);
    console.log();
    //Parallel request for data for all validators
    const dotValidators = VALIDATORS.filter((validator) => validator.network === "polkadot");
    const ksmValidators = VALIDATORS.filter((validator) => validator.network === "kusama");
    let dataset = await Promise.all([
        dotValidators.map((validator) => getAPIData(validator, "DOT", ERADEPTH, activeEraDOT, apiDOT)),
        ksmValidators.map((validator) => getAPIData(validator, "KSM", ERADEPTH, activeEraKSM, apiKSM)),
    ].flat());
    printSummary(dataset);
    printNominators(dataset);
}
//Print summary table
//////////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS
//Loop over eras collecting data
async function getAPIData(validator, network, eraDepth, activeEra, api) {
    //Make all data requests in parallel
    let promiseErasStakers = [];
    let promiseErasRewardPoints = [];
    let erasStakers = [];
    let erasRewardPoints = [];
    for (let i = 0; i < eraDepth; i++) {
        promiseErasStakers[i] = api.query.staking.erasStakers(activeEra - eraDepth + i + 1, validator.stash);
        promiseErasRewardPoints[i] =
            api.query.staking.erasRewardPoints(activeEra - eraDepth + i + 1);
    }
    let promiseLedger = api.query.staking
        .bonded(validator.stash)
        .then((controller) => api.query.staking.ledger(controller.toString()));
    //Wait for all the requests to finish
    erasStakers = await Promise.all(promiseErasStakers);
    erasRewardPoints = await Promise.all(promiseErasRewardPoints);
    let ledger = await promiseLedger;
    //Fill sparse array so we can use era indexing naturally
    erasStakers = Array(activeEra - eraDepth + 1).concat(erasStakers);
    erasRewardPoints = Array(activeEra - eraDepth + 1).concat(erasRewardPoints);
    let dataset = {
        erasStakers: [],
        erasRewardPoints: [],
        ledger: ledger.unwrap(),
        validator: validator,
        network: network,
    };
    //Export any eras with points awarded. Note this sometimes includes eras the validator was not active.
    erasRewardPoints.forEach((x, era) => {
        if (getEraRewardPoints(validator.stash, x)) {
            dataset["erasStakers"][era] = erasStakers[era];
            dataset["erasRewardPoints"][era] = erasRewardPoints[era];
        }
    });
    return dataset;
}
function printSummary(dataset) {
    //For Each Validator
    dataset.forEach((data) => {
        const planck = getPlanck(data.network);
        process.stdout.write(`Validator ${data["validator"].stash}\n`);
        process.stdout.write(`          ${data["validator"].network}`);
        process.stdout.write(` ${data["validator"].name}\n\n`);
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
            if (claimedEras.includes(era))
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
                    process.stdout.write("     ");
                }
                process.stdout.write(n.stake.toLocaleString("en-US").padStart(11));
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
    //let nominations: Nominations[] = Array;
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
