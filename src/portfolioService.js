
import { BrowserProvider } from 'ethers';
import { formatEther } from 'ethers';

const COINGECKO_API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

/**
 * Fetch ETH balance using ethers v6+ via MetaMask
 */
export async function getEthBalance(address) {
  const provider = new BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(address);
  return formatEther(balance);
}

/**
 * Fetch ETH price in USD from Coingecko
 */
export async function getEthPrice() {
  const res = await fetch(`${COINGECKO_API}/simple/price?ids=ethereum&vs_currencies=usd&x_cg_pro_api_key=${COINGECKO_API_KEY}`);
  const data = await res.json();
  return data?.ethereum?.usd || 0;
}

/**
 * Return full ETH portfolio snapshot
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
