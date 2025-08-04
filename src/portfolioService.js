
// portfolioService.js

import { ethers } from 'ethers';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

/**
 * Fetch ETH balance from blockchain
 * @param {string} address - Ethereum wallet address
 * @returns {Promise<string>} - ETH balance in Ether
 */
export async function getEthBalance(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

/**
 * Fetch current ETH price in USD from Coingecko
 * @returns {Promise<number>} - Current ETH price in USD
 */
export async function getEthPrice() {
  const res = await fetch(\`\${COINGECKO_API}/simple/price?ids=ethereum&vs_currencies=usd\`);
  const data = await res.json();
  return data?.ethereum?.usd || 0;
}

/**
 * Get full portfolio summary (ETH + USD value)
 * @param {string} address
 * @returns {Promise<object>} - { ethBalance, ethPrice, usdValue }
 */
export async function getPortfolio(address) {
  const ethBalance = await getEthBalance(address);
  const ethPrice = await getEthPrice();
  const usdValue = (parseFloat(ethBalance) * ethPrice).toFixed(2);
  return {
    ethBalance,
    ethPrice,
    usdValue
  };
}
