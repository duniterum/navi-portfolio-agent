
export async function getDeFiPortfolio(walletAddress) {
  const url = `https://openapi.debank.com/v1/user/total_balance?id=${walletAddress}`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    chainList: data.chain_list,
    totalUsdValue: data.total_usd_value.toFixed(2),
    stableUsdValue: data.stable_usd_value.toFixed(2),
    assetUsdValue: data.asset_usd_value.toFixed(2)
  };
}
