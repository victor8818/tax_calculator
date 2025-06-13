function calculateIncomeTax(income) {
  let tax = 0;
  switch (true) {
    case income <= 18200:
      tax = 0;
      break;
    case income <= 45000:
      tax = (income - 18200) * 0.16;
      break;
    case income <= 135000:
      tax = 4288 + (income - 45000) * 0.30;
      break;
    case income <= 190000:
      tax = 31288 + (income - 135000) * 0.37;
      break;
    default:
      tax = 51638 + (income - 190000) * 0.45;
  }
  return tax;
}

function calculateMedicareLevy(income, isExempt = false) {
  return isExempt ? 0 : income * 0.02;
}

function calculateHELPRepayment(income, hasHELP = false) {
  if (!hasHELP || income < 51550) return 0;
  if (income < 59519) return income * 0.01;
  if (income < 63089) return income * 0.02;
  if (income < 66923) return income * 0.03;
  if (income < 70991) return income * 0.04;
  if (income < 75324) return income * 0.05;
  if (income < 79950) return income * 0.06;
  if (income < 84898) return income * 0.07;
  if (income < 90201) return income * 0.08;
  if (income < 95899) return income * 0.09;
  return income * 0.10;
}

function calculateTotalTax({
  income,
  workDeductions = 0,
  otherDeductions = 0,
  superContributions = 0,
  isMedicareExempt = false,
  hasHELP = false
}) {
  const adjustedIncome = Math.max(income - workDeductions - otherDeductions - superContributions, 0);
  const incomeTax = calculateIncomeTax(adjustedIncome);
  const medicareLevy = calculateMedicareLevy(adjustedIncome, isMedicareExempt);
  const helpRepayment = calculateHELPRepayment(adjustedIncome, hasHELP);
  const totalTax = incomeTax + medicareLevy + helpRepayment;

  return {
    adjustedIncome,
    incomeTax,
    medicareLevy,
    helpRepayment,
    totalTax
  };
}
