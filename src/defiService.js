
const DEBANK_API = 'https://openapi.debank.com/v1/user/total_balance';

export async function getDeFiPortfolio(walletAddress) {
  try {
    const res = await fetch(`${DEBANK_API}?id=${walletAddress}`);
    const data = await res.json();

    return {
      chainList: data.chain_list,
      totalUsdValue: data.total_usd_value?.toFixed(2) || '0.00',
      stableUsdValue: data.stable_usd_value?.toFixed(2) || '0.00',
      assetUsdValue: data.asset_usd_value?.toFixed(2) || '0.00'
    };
  } catch (err) {
    console.error("Failed to fetch DeFi portfolio:", err);
    return {
      chainList: [],
      totalUsdValue: '0.00',
      stableUsdValue: '0.00',
      assetUsdValue: '0.00'
    };
  }
}
