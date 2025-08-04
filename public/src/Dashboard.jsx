
import React, { useState, useEffect } from 'react';
import WalletUI from './WalletUI';
import { getPortfolio } from './portfolioService';
import { getTokenPortfolio } from './portfolioTokenService';
import { getDeFiPortfolio } from './defiService';

const Dashboard = () => {
  const [wallet, setWallet] = useState('');
  const [ethData, setEthData] = useState(null);
  const [tokenData, setTokenData] = useState([]);
  const [deFiData, setDeFiData] = useState(null);

  useEffect(() => {
    if (wallet) {
      getPortfolio(wallet).then(setEthData);
      getTokenPortfolio(wallet).then(setTokenData);
      getDeFiPortfolio(wallet).then(setDeFiData);
    }
  }, [wallet]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Navi: AI Crypto Portfolio Strategist</h1>
      <WalletUI onConnect={setWallet} />
      {wallet && <p>Connected Wallet: {wallet}</p>}
      {ethData && <p>ETH Balance: {ethData.ethBalance} (${ethData.usdValue})</p>}
      {tokenData.length > 0 && (
        <div>
          <h2>Tokens</h2>
          <ul>
            {tokenData.map((t, idx) => (
              <li key={idx}>{t.name} ({t.symbol}): {t.balance} (${t.usdValue})</li>
            ))}
          </ul>
        </div>
      )}
      {deFiData && (
        <div>
          <h2>DeFi Summary</h2>
          <p>Total: ${deFiData.totalUsdValue}</p>
          <p>Stablecoins: ${deFiData.stableUsdValue}</p>
          <p>Volatile Assets: ${deFiData.assetUsdValue}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
