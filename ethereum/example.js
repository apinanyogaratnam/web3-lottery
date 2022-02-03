import web3 from './web3';
import Example from './build/Example.json';

const instance = new web3.eth.Contract(
    Example.abi,
    '0x1ddcC5bC9ea017D692Eb3B9268D0c71318012d58'
);

export default instance;
