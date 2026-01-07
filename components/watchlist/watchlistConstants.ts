
import { StockTicker } from '../../types';

export const generateMockTickers = (): StockTicker[] => {
  const symbols = ['ACB', 'BCM', 'BID', 'BVH', 'CTG', 'FPT', 'GAS', 'GVR', 'HDB', 'HPG', 'MBB', 'MSN', 'MWG', 'PLX', 'POW', 'SAB', 'SHB', 'SSB', 'SSI', 'STB', 'TCB', 'TPB', 'VCB', 'VHM', 'VIB', 'VIC', 'VJC', 'VNM', 'VPB', 'VRE'];
  
  return symbols.map(sym => {
    const basePrice = Math.random() * 100 + 10;
    const ref = parseFloat(basePrice.toFixed(2));
    const ceiling = parseFloat((ref * 1.07).toFixed(2));
    const floor = parseFloat((ref * 0.93).toFixed(2));
    
    // Simulate current price between floor and ceiling
    const close = parseFloat((ref * (0.98 + Math.random() * 0.04)).toFixed(2));
    const change = close - ref;
    const changePercent = (change / ref) * 100;

    return {
      symbol: sym,
      ceiling,
      floor,
      ref,
      
      bid3_price: parseFloat((close - 0.1).toFixed(2)),
      bid3_vol: Math.floor(Math.random() * 50000),
      bid2_price: parseFloat((close - 0.05).toFixed(2)),
      bid2_vol: Math.floor(Math.random() * 100000),
      bid1_price: parseFloat((close - 0.02).toFixed(2)),
      bid1_vol: Math.floor(Math.random() * 200000),

      close,
      change,
      changePercent,
      matched_vol: Math.floor(Math.random() * 10000),

      ask1_price: parseFloat((close + 0.02).toFixed(2)),
      ask1_vol: Math.floor(Math.random() * 150000),
      ask2_price: parseFloat((close + 0.05).toFixed(2)),
      ask2_vol: Math.floor(Math.random() * 80000),
      ask3_price: parseFloat((close + 0.1).toFixed(2)),
      ask3_vol: Math.floor(Math.random() * 40000),

      total_vol: Math.floor(Math.random() * 5000000),
      high: parseFloat((Math.max(close, ref) + Math.random()).toFixed(2)),
      avg: parseFloat(((close + ref)/2).toFixed(2)),
      low: parseFloat((Math.min(close, ref) - Math.random()).toFixed(2)),

      foreign_buy: Math.floor(Math.random() * 100000),
      foreign_sell: Math.floor(Math.random() * 100000),
    };
  });
};
