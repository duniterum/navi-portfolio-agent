
import { ethers } from "ethers";

export async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return address;
    } catch (err) {
      console.error("MetaMask connection rejected:", err);
      return null;
    }
  } else {
    alert("MetaMask not found. Please install it.");
    return null;
  }
}

export function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  localStorage.setItem("navi_wallet", JSON.stringify({
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase
  }));
  return wallet;
}

export function loadWallet() {
  const data = JSON.parse(localStorage.getItem("navi_wallet"));
  if (!data) return null;
  return new ethers.Wallet(data.privateKey);
}
