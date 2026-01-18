export const WEBHOOK_URL = "https://your-webhook-endpoint.com/submit-quote";

export const ASSET_LIQUIDATION_FEE_PERCENTAGE = 0.05; // 5%

export const CURRENCY_FORMAT = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
  maximumFractionDigits: 0,
});

export const COLORS = {
  income: '#ff8a50',
  liabilities: '#ff4800',
  liquidation: '#d84315',
  others: '#bf360c'
};