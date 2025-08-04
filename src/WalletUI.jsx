
import React, { useState } from 'react';
import { connectMetaMask, generateWallet } from './walletManager';

export default function WalletUI() {
  const [walletAddress, setWalletAddress] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  const handleConnect = async () => {
    const address = await connectMetaMask();
    if (address) {
      setWalletAddress(address);
      setMnemonic('');
    }
  };

  const handleGenerate = () => {
    const wallet = generateWallet();
    setWalletAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
  };

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', borderRadius: '12px', width: '400px', margin: '20px auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>🧠 Navi Wallet Manager</h2>
      <button onClick={handleConnect} style={btnStyle}>🔌 Connect MetaMask</button>
      <button onClick={handleGenerate} style={{ ...btnStyle, marginTop: '10px' }}>🧪 Generate New Wallet</button>

      {walletAddress && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Address:</strong><br />{walletAddress}</p>
        </div>
      )}

      {mnemonic && (
        <div style={{ marginTop: '20px', backgroundColor: '#333', padding: '10px', borderRadius: '8px' }}>
          <p><strong>⚠️ Save your recovery phrase securely:</strong></p>
          <p style={{ fontFamily: 'monospace', wordBreak: 'break-word' }}>{mnemonic}</p>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  background: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};
