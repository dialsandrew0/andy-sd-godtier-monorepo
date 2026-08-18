export interface GigSession {
  id: string;
  platform: 'DOORDASH' | 'UBER_EATS' | 'INSTACART' | 'SPARK' | 'FREELANCE_DEV' | 'OTHER';
  grossEarnings: number;
  tips: number;
  hoursWorked: number;
  milesDriven: number;
  directExpenses?: number;
}

export interface ShiftFinancials {
  grossTotal: number;
  totalHours: number;
  totalMiles: number;
  taxableIncome: number;
  estimatedTaxLiability: number;
  netEarnings: number;
  grossHourlyRate: number;
  trueNetHourlyRate: number;
  efficiencyTier: 'GOD_TIER' | 'OPTIMAL' | 'MODERATE' | 'SUB_PAR' | 'UNPROFITABLE';
}

export class GD_MetricsEngine {
  public static analyzeShift(sessions: GigSession[]): ShiftFinancials {
    const grossTotal = sessions.reduce((acc, s) => acc + s.grossEarnings + s.tips, 0);
    const totalHours = sessions.reduce((acc, s) => acc + s.hoursWorked, 0);
    const totalMiles = sessions.reduce((acc, s) => acc + s.milesDriven, 0);
    const directExpensesTotal = sessions.reduce((acc, s) => acc + (s.directExpenses || 0), 0);

    const mileageDeduction = totalMiles * 0.67;
    const taxableIncome = Math.max(0, grossTotal - mileageDeduction - directExpensesTotal);
    const estimatedTaxLiability = Number((taxableIncome * 0.25).toFixed(2));
    const netEarnings = Number((grossTotal - directExpensesTotal - estimatedTaxLiability).toFixed(2));

    const grossHourlyRate = totalHours > 0 ? Number((grossTotal / totalHours).toFixed(2)) : 0;
    const trueNetHourlyRate = totalHours > 0 ? Number((netEarnings / totalHours).toFixed(2)) : 0;

    let efficiencyTier: ShiftFinancials['efficiencyTier'] = 'UNPROFITABLE';
    if (trueNetHourlyRate >= 45) efficiencyTier = 'GOD_TIER';
    else if (trueNetHourlyRate >= 30) efficiencyTier = 'OPTIMAL';
    else if (trueNetHourlyRate >= 20) efficiencyTier = 'MODERATE';
    else if (trueNetHourlyRate > 0) efficiencyTier = 'SUB_PAR';

    return { grossTotal, totalHours, totalMiles, taxableIncome, estimatedTaxLiability, netEarnings, grossHourlyRate, trueNetHourlyRate, efficiencyTier };
  }
}
