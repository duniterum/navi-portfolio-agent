
import React from 'react';
import { connectWallet } from './walletManager';

const WalletUI = ({ onConnect }) => {
  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      onConnect(wallet.address);
    }
  };

  return <button onClick={handleConnect}>Connect Wallet</button>;
};

export default WalletUI;
