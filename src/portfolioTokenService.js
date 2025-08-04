
export async function getTokenPortfolio(walletAddress) {
  const url = `https://api.covalenthq.com/v1/1/address/${walletAddress}/balances_v2/?key=ckey_demo`;
  const res = await fetch(url);
  const data = await res.json();
  const tokens = data.data.items || [];
  return tokens.map(t => ({
    name: t.contract_name,
    symbol: t.contract_ticker_symbol,
    balance: (t.balance / 10 ** t.contract_decimals).toFixed(4),
    price: t.quote_rate?.toFixed(2),
    usdValue: t.quote?.toFixed(2)
  }));
}
