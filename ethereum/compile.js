const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const hotelPath = path.resolve(__dirname, 'contracts', 'Example.sol');
const source = fs.readFileSync(hotelPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Example.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

fs.outputJsonSync(
    path.resolve(buildPath, 'Example.json'),
    output.contracts['Example.sol']['Example']
);
