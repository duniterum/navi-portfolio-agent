
import React from 'react';
import { ethers } from 'ethers';

const WalletUI = ({ onConnect }) => {
  const connect = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    onConnect(address);
  };

  return <button onClick={connect}>Connect Wallet</button>;
};

export default WalletUI;
