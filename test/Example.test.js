const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider({ gasLimit: 10000000 }));

const { abi, evm } = require('../ethereum/build/Example.json');

let accounts;
let example;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    example = await new web3.eth.Contract(abi)
      .deploy({
        data: evm.bytecode.object,
        arguments: [],
      })
      .send({ from: accounts[0], gas: '10000000' });
});

describe('Example', () => {
    it('deploys a contract', () => {
        assert.ok(example.options.address);
    });
});
