## Solidity gas tests

###Array vs Mapping

To test, run `npm install -g truffle && npm install && truffle compile && mocha`

###Some Results

| Value Type | Cheapest array implementation |
| ------ | ----------- |
| `uint`  | `mapping(uint => uint)` |
| `uint8` | `uint8[]` |
| `bytes32`    | `bytes32[]` |
| `bytes16`    | `bytes16[]` |
| `Struct {uint, bytes32}` | `mapping (uint64 => Struct)` |
