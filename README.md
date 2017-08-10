# ethtaint

Taint tracking for Ethereum.

Simple web interface:

![](https://raw.githubusercontent.com/wiki/jestcrows/ethtaint/image/WebInterface2.png)

Command line interface:

```bash
$ node bin/ethtaint.js 0xEF8C7C725AA425DEee9999a03701c75b2872963f 4041126

Tracing taint from: 0xb3764761e297d6f121e79c32a65829cd1ddb4d32 4041126
0x6b7496e55d7a003694c1b040343c65d4a6b38cd5
0x18345118bd04c405b4d74941563a21b5a2bf06b7
0x6a14e385fff2f21abe425a07ce29842b7037a80d
0x0b21fd643aaaf5af800af67e14ebf4886be20164
0x5167052b83f36952d1a9901e0de2b2038c3dd1a3
0x2d146aa23645950fdefbb23f636a5d1674fe1047
0x4de76b3dfd38292ba71cf2465ca3a1d526dcb567
0xef0683bef79b7ad85573415c781edfde8bec65b1
0x70faa28a6b8d6829a4b1e649d26ec9a2a39ba413
0xeb9fb52eba8f05c69cad7e26255a514e14b24476
0x8f13178f25b444cd38b25d3e716cfb78e3ca3d7a
0x474aa9c6f46dc6379c638690fd8f5ade22df5205
Tainted 13 / Traced 7 / Txs 47
```

## Usage

Install [NodeJS](https://nodejs.org/en/) version 8.2.1.  

Clone the repository:  
`git clone https://github.com/jestcrows/ethtaint.git`  
`cd ethtaint`  

Install node modules:  
`npm install`  

Provide your [Etherscan API key](https://etherscan.io/apis) in a new local configuration file `config/local.json`:  
```json
{
  "Etherscan": {
    "apiKey": "YOURAPIKEY"
  }
}
```

Start a trace. Specify a source address and taint starting block. Start block defaults to 0:  
`node bin/etherscan.js 0xEF8C7C725AA425DEee9999a03701c75b2872963f 4041126`

Status and results will output to the command line. A list of identified tainted addresses will be written to `trace/SOURCEADDRESS-STARTBLOCK`. Tracing will continue until all existing chain data has been exhausted. A full trace can take a long time.

To use the web interface start the web server with `node web/server.js`. Open the interface in your browser at `http://localhost:7403/`.

You can resume a past trace any time from either interface. Simply start a trace with the same source address and start block. Existing information will be read from the save of past traces. The new trace will continue where the past traces left off.

## Development

Targets these development ideals:

* Well commented.
* Clear [modular architecture](https://github.com/jestcrows/ethtaint/wiki/Architecture).
* Core [data specification](https://github.com/jestcrows/ethtaint/wiki/Data-Specification).
* [Unit tests](https://github.com/jestcrows/ethtaint/tree/master/test).
* Generated [API documentation](https://jestcrows.github.io/ethtaint/).

## Unlicense

ethtaint is [public domain](https://choosealicense.com/licenses/unlicense/).