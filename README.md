## Solidity gas tests

###Array vs Mapping

Intuitively one would expect mappings to incur an additional hash operation (~20 GAS), however this is not the case with solc `Version: 0.1.1-1a5039f4/RelWithDebInfo-Darwin/clang/int`


To test, run `npm install -g truffle && npm install && truffle compile && mocha`

###Results

| Value Type | Cheapest array implementation |
| ------ | ----------- |
| `uint`  | `mapping(uint => uint)` |
| `uint8` | `uint8[]` |
| `bytes32`    | `bytes32[]` |
| `bytes16`    | `bytes16[]` |
| `Struct {uint, bytes32}` | `mapping (uint64 => Struct)` |
