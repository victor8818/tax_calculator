document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tax-form");
  const resultDiv = document.getElementById("results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const income = parseFloat(document.getElementById("income").value);
    const workDeductions = parseFloat(document.getElementById("workDeductions").value || 0);
    const otherDeductions = parseFloat(document.getElementById("otherDeductions").value || 0);
    const superContributions = parseFloat(document.getElementById("superContributions").value || 0);
    const isMedicareExempt = document.getElementById("isMedicareExempt").checked;
    const hasHELP = document.getElementById("hasHELP").checked;

    const result = calculateTotalTax({
      income,
      workDeductions,
      otherDeductions,
      superContributions,
      isMedicareExempt,
      hasHELP
    });

    resultDiv.innerHTML = `
      <h2 class="font-bold text-xl mt-4">Results</h2>
      <p>Adjusted Income: $${result.adjustedIncome.toFixed(2)}</p>
      <p>Income Tax: $${result.incomeTax.toFixed(2)}</p>
      <p>Medicare Levy: $${result.medicareLevy.toFixed(2)}</p>
      <p>HELP Repayment: $${result.helpRepayment.toFixed(2)}</p>
      <p class="font-semibold">Total Payable: $${result.totalTax.toFixed(2)}</p>
    `;
  });
});
