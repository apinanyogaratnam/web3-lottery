import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import lottery from '../ethereum/lottery';
import web3 from '../ethereum/web3';
import React from 'react';
import FileSaver from 'file-saver';

export default function Home() {
  const [jackpotTotal, setJackpotTotal] = React.useState('');
  const [amountToStake, setAmountToStake] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [covalentData, setCovalentData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await lottery.methods.getJackpotAmount().call();
      const totalJackpot = web3.utils.fromWei(response, 'ether');
      setJackpotTotal(totalJackpot);
    }
    fetchData();
  }, [jackpotTotal]);

  const stakeNow = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const amount = web3.utils.toWei(amountToStake, 'ether');
    await lottery.methods.depositIntoJackpot().send({
      from: accounts[0],
      value: amount,
    });
    setAmountToStake('');
  };

  const drawNow = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.drawLottery().send({
      from: accounts[0],
    });
  };

  const downloadMetadata = async (event) => {
    const covalent = "https://api.covalenthq.com/v1/1/address/" + address + "/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&key=" + process.env.NEXT_PUBLIC_COVALENT_API_KEY;
    const covalentRes = await axios.get(covalent);
    setCovalentData(covalentRes.data.data);
    FileSaver.saveAs(covalentRes.data.data, "covalent.json");
  };

  return (
    <div>
      <h1>Web3 Lottery</h1>
      <h3>Jackpot Total: {jackpotTotal}</h3>
      <form>
        <input type='text' placeholder='amount to stake' value={amountToStake} onChange={e => setAmountToStake(e.target.value)} />
        <input type='text' placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
      </form>
      <button onClick={stakeNow}>Stake</button>
      <button onClick={drawNow}>Draw</button>
      <button onClick={downloadMetadata}>Download Metadata</button>
    </div>
  )
}
