
// Dashboard.jsx

import React, { useState } from 'react';
import WalletUI from './WalletUI';
import { getPortfolio } from './portfolioService';

export default function Dashboard() {
  const [wallet, setWallet] = useState('');
  const [portfolio, setPortfolio] = useState(null);

  const handleWalletUpdate = async (address) => {
    setWallet(address);
    const data = await getPortfolio(address);
    setPortfolio(data);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🧠 Navi – Crypto Portfolio Agent</h1>
        <p style={styles.subtitle}>Smart. Secure. On-chain. Always watching your assets.</p>
      </header>

      <main style={styles.main}>
        <WalletUI onWalletChange={handleWalletUpdate} />

        <section style={styles.card}>
          <h3>📊 Portfolio Overview</h3>
          {!wallet && <p>Connect a wallet to view your portfolio.</p>}
          {portfolio && (
            <ul>
              <li><strong>ETH Balance:</strong> {portfolio.ethBalance}</li>
              <li><strong>ETH Price:</strong> ${portfolio.ethPrice}</li>
              <li><strong>USD Value:</strong> ${portfolio.usdValue}</li>
            </ul>
          )}
        </section>

        <section style={styles.card}>
          <h3>⚖️ Rebalancing Settings</h3>
          <p>Coming soon: Risk profile, auto-balancer, and asset preferences.</p>
        </section>

        <section style={styles.card}>
          <h3>🔔 Alerts & Notifications</h3>
          <p>Coming soon: Enable Telegram, Email or Discord alerts.</p>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212',
    color: '#f0f0f0',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#ccc'
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px'
  }
};
