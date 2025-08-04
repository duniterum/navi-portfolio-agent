
import { BrowserProvider, Wallet } from 'ethers';

/**
 * Connect to MetaMask wallet using ethers v6
 */
export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask is not installed");
    return null;
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { address, provider };
}

/**
 * Generate a new wallet (optional backup flow)
 */
export function generateWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase
  };
}
