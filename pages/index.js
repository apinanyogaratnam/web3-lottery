import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import lottery from '../ethereum/lottery';
import web3 from '../ethereum/web3';
import React from 'react';

export default function Home() {
  const [jackpotTotal, setJackpotTotal] = React.useState('');
  const [amountToStake, setAmountToStake] = React.useState('');

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

  return (
    <div>
      <h1>Web3 Lottery</h1>
      <h3>Jackpot Total: {jackpotTotal}</h3>
      <form>
        <input type="text" placeholder="amount to stake" value={amountToStake} onChange={e => setAmountToStake(e.target.value)} />
      </form>
      <button onClick={stakeNow}>Stake</button>
      <button onClick={drawNow}>Draw</button>
    </div>
  )
}
