# ethtaint

Taint tracking for Ethereum.

```bash
$ node bin/ethtaint.js 0xEF8C7C725AA425DEee9999a03701c75b2872963f

Tracing taint from: 0xEF8C7C725AA425DEee9999a03701c75b2872963f
0x721bb8bed717b7f72330ff53da749ff8cd809229
0x3377f722d4dc9ff0b27dad7c330fbd3d87f9b958
0x91f9658ce12b05dc3bf4389782d8d3b43c9ced01
0x1c3f580daeaac2f540c998c8ae3e4b18440f7c45
0x3933d44c4d2d9ab0f8d3ece09d422d0bcad96fea
0xacee952da0f5c71ea6a7759d3fdaf40b9e98429b
0xd5c52f1e4ab15327ab3eacbd2b13c4c80f233c95
0x37ea17d6dd14943ff7aab8049b2c8ac52c349b4d
0x4232b9731c8abb00e6c62248686471d082e3a17d
Tainted 10 / Traced 1 / Txs 3611
```

## Usage

Clone the repository:  
`git clone https://github.com/jestcrows/ethtaint.git`  
`cd ethtaint`  

Provide your [Etherscan API key](https://etherscan.io/apis) in a new local configuration file `config/local.json`:  
```json
{
  "Etherscan": {
    "apiKey": "YOURAPIKEY"
  }
}
```

Start a trace:  
`node bin/etherscan.js 0xEF8C7C725AA425DEee9999a03701c75b2872963f`

Status and results will output to the command line. A list of identified tainted addresses will be written to `trace/SOURCEADDRESS`. Tracing will continue until all existing chain data has been exhausted. A full trace can take a long time.

## Development

Targets these development ideals:

* Well commented.
* Clear [modular architecture](https://github.com/jestcrows/ethtaint/wiki/Architecture).
* Core [data specification](https://github.com/jestcrows/ethtaint/wiki/Data-Specification).
* [Unit tests](https://github.com/jestcrows/ethtaint/tree/master/test).
* Generated [API documentation](https://jestcrows.github.io/ethtaint/).

## Unlicense

ethtaint is [public domain](https://choosealicense.com/licenses/unlicense/).