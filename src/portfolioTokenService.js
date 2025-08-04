
// portfolioTokenService.js

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const COVALENT_API_KEY = 'demo'  // Replace with your key if needed
const CHAIN_ID = 1; // Ethereum Mainnet

/**
 * Fetch all token balances and symbols for a wallet using Covalent
 * @param {string} walletAddress
 */
export async function getTokenBalances(walletAddress) {
  const url = \`https://api.covalenthq.com/v1/\${CHAIN_ID}/address/\${walletAddress}/balances_v2/?key=\${COVALENT_API_KEY}&nft=false\`;
  const res = await fetch(url);
  const json = await res.json();

  const tokens = json?.data?.items
    ?.filter(t => t.type === "cryptocurrency" && parseFloat(t.balance) > 0)
    ?.map(token => ({
      name: token.contract_name,
      symbol: token.contract_ticker_symbol,
      balance: parseFloat(token.balance) / 10 ** token.contract_decimals,
      contractAddress: token.contract_address
    })) || [];

  return tokens;
}

/**
 * Fetch USD prices for multiple tokens using Coingecko
 * @param {string[]} symbols - Array of token symbols (e.g., ["eth", "usdc", "link"])
 */
export async function getTokenPrices(symbols = []) {
  const ids = symbols.map(s => s.toLowerCase()).join('%2C');
  const res = await fetch(\`\${COINGECKO_API}/simple/price?ids=\${ids}&vs_currencies=usd\`);
  const data = await res.json();
  return data;
}

/**
 * Get portfolio summary of token holdings with USD values
 */
export async function getTokenPortfolio(walletAddress) {
  const tokens = await getTokenBalances(walletAddress);
  const symbolMap = {
    'ETH': 'ethereum',
    'USDC': 'usd-coin',
    'USDT': 'tether',
    'DAI': 'dai',
    'LINK': 'chainlink'
    // Add more token symbol-to-ID mappings here if needed
  };

  const symbolsToQuery = [...new Set(tokens.map(t => symbolMap[t.symbol] || null).filter(Boolean))];
  const prices = await getTokenPrices(symbolsToQuery);

  const result = tokens.map(token => {
    const geckoId = symbolMap[token.symbol];
    const price = geckoId ? prices[geckoId]?.usd || 0 : 0;
    const usdValue = parseFloat((token.balance * price).toFixed(2));
    return { ...token, price, usdValue };
  });

  return result;
}
