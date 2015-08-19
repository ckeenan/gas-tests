var web3 = require('web3');
var path = require('path');
var fs = require('fs');
var contractAbis = require('../config/development/contracts');
var config = require('../config/development/config.json');
if (!config.hasOwnProperty('rpc')) config = require('../config/app.json');
web3.setProvider(new web3.providers.HttpProvider('http://' + config.rpc.host + ':' + config.rpc.port));

function waitForTx(hash, cb) {
  var filter = web3.eth.filter('latest');
  var title = this.test.title;
  filter.watch(function(err, block) {
    function exit(obj, cb) {
      if (obj.hasOwnProperty('blockNumber') && obj.blockNumber > 0) {
        filter.stopWatching();
        console.log(title, 'gasUsed', obj.gasUsed);
        if (obj.hasOwnProperty('contractAdress') && obj.contractAdress.length)
          cb(obj.gasUsed, obj.contractAdress);
        else cb(obj.gasUsed);
      }
    }

    web3.eth.getTransactionReceipt(hash, function(err, txReceipt) {
      if (err) throw err;
      if (txReceipt)
        exit(txReceipt, cb);
    });
  });
}

var contractMap = {};

function genContract(cb) {
  var name = this.test.fullTitle().split(' ')[0];

  contractMap[name].new({
    from: web3.eth.coinbase,
    gas: MAX_GAS,
    data: contractAbis[name].binary
  }, function(err, res) {
    if (res.address)
      cb(contractMap[name].at(res.address));
  });

}

function initContracts() {
  var files =fs.readdirSync('./contracts/');
  files.forEach(function(f) {
    var shortName = f.slice(0, f.length - 4);
    if (path.extname(f) == '.sol')
      contractMap[shortName] = web3.eth.contract(contractAbis[shortName].abi);
  });
}

initContracts();

var MAX_GAS = 3000000;

describe('ArrayVSMap', function() {
  var contract;

  before(function(done) {
    genContract.call(this, function(contractInstance) {
      contract = contractInstance;
      done();
    });
  });

  it("add element to array", function(done) {
    var hash = contract.addToArr.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add second element to array", function(done) {
    var hash = contract.addToArr.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to fixed array", function(done) {
    var hash = contract.addToArrFixed.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add second element to fixed array", function(done) {
    var hash = contract.addToArrFixed.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to mapping", function(done) {
    var hash = contract.addToMap.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to mapping", function(done) {
    var hash = contract.addToMap.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint256 map", function(done) {
    var hash = contract.addTo256Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint256 map", function(done) {
    var hash = contract.addTo256Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint64 map", function(done) {
    var hash = contract.addTo64Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint64 map", function(done) {
    var hash = contract.addTo64Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint48 map", function(done) {
    var hash = contract.addTo48Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint48 map", function(done) {
    var hash = contract.addTo48Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint40 map", function(done) {
    var hash = contract.addTo40Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint40 map", function(done) {
    var hash = contract.addTo40Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint32 map", function(done) {
    var hash = contract.addTo32Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint32 map", function(done) {
    var hash = contract.addTo32Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint24 map", function(done) {
    var hash = contract.addTo24Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint24 map", function(done) {
    var hash = contract.addTo24Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint16 map", function(done) {
    var hash = contract.addTo16Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint16 map", function(done) {
    var hash = contract.addTo16Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

  it("add element to uint8 map", function(done) {
    var hash = contract.addTo8Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });
  it("add second element to uint8 map", function(done) {
    var hash = contract.addTo8Map.sendTransaction('a', {from: web3.eth.coinbase, gas: MAX_GAS});
    waitForTx.call(this, hash, function() { done(); });
  });

});
