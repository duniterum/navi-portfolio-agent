
import { BrowserProvider, JsonRpcProvider, formatEther } from 'ethers';

const COINGECKO_API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;
const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

function getProvider() {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new BrowserProvider(window.ethereum);
  } else if (INFURA_PROJECT_ID) {
    return new JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);
  } else {
    throw new Error("No provider available");
  }
}

export async function getEthBalance(address) {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  return formatEther(balance);
}

export async function getEthPrice() {
  const res = await fetch(`${COINGECKO_API}/simple/price?ids=ethereum&vs_currencies=usd&x_cg_pro_api_key=${COINGECKO_API_KEY}`);
  const data = await res.json();
  return data?.ethereum?.usd || 0;
}

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
