import { GD_MetricsEngine } from '../GD_MetricsEngine';

describe('GD_MetricsEngine', () => {
  test('calculates shift metrics correctly', () => {
    const result = GD_MetricsEngine.analyzeShift([{
      id: 's1',
      platform: 'FREELANCE_DEV',
      grossEarnings: 300,
      tips: 0,
      hoursWorked: 5,
      milesDriven: 0
    }]);
    expect(result.grossTotal).toBe(300);
    expect(result.grossHourlyRate).toBe(60);
    expect(result.efficiencyTier).toBe('GOD_TIER');
  });
});
