import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import example from '../ethereum/example';
import web3 from '../ethereum/web3';
import React from 'react';

export default function Home() {
  const [message, setMessage] = React.useState('');
  const [input, setInput] = React.useState('');
  const [loadingMessage, setLoadingMessage] = React.useState('');

  React.useEffect(async () => {
      const response = await example.methods.getMessage().call();
      setMessage(response);
  });

  const setMessageHandler = async (event) => {
    event.preventDefault();

    setLoadingMessage('Loading...');

    const accounts = await web3.eth.getAccounts();
    const tx = await example.methods.setMessage(input).send({ from: accounts[0] });
    console.log(tx);

    const response = await example.methods.getMessage().call();
    setMessage(response);

    setLoadingMessage('');

    setInput('');
  };

  return (
    <div>
      <h1>Example Decentralized App</h1>
      <h3>Message: {message}</h3>
      <form>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit" onClick={setMessageHandler}>set message</button>
      </form>
      {loadingMessage}
    </div>
  )
}
