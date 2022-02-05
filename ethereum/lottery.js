import web3 from './web3';
import Lottery from './build/Lottery.json';

const instance = new web3.eth.Contract(
    Lottery.abi,
    '0x07FaD170d196f87524c97Fb64819d0D5c0348D57'
);

export default instance;
