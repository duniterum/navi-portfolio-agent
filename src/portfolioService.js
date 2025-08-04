
import { ethers } from 'ethers';

const COINGECKO_API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

/**
 * Fetch ETH balance from blockchain
 */
export async function getEthBalance(address) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

/**
 * Fetch current ETH price in USD from Coingecko
 */
export async function getEthPrice() {
  const res = await fetch(`${COINGECKO_API}/simple/price?ids=ethereum&vs_currencies=usd&x_cg_pro_api_key=${COINGECKO_API_KEY}`);
  const data = await res.json();
  return data?.ethereum?.usd || 0;
}

/**
 * Get full portfolio summary (ETH + USD value)
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
