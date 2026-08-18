import { FF_ArbitrageEngine } from '../FF_ArbitrageEngine';

describe('FF_ArbitrageEngine', () => {
  test('calculates correct eBay fees and net profit', () => {
    const metrics = FF_ArbitrageEngine.analyzeOpportunity({
      buyPrice: 10,
      estMarketValue: 100,
      condition: 'NEW_SEALED',
      platform: 'EBAY'
    });
    expect(metrics.adjustedMarketValue).toBe(100);
    expect(metrics.platformFees).toBe(13.55);
    expect(metrics.netProfit).toBe(76.45);
    expect(metrics.tierRating).toBe('GOD_TIER');
  });
});
