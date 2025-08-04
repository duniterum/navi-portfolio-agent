
import { BrowserProvider, Wallet } from 'ethers';

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

export function generateWallet() {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase
  };
}
