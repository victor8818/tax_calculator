document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tax-form");
  const resultDiv = document.getElementById("results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const income = parseFloat(document.getElementById("income").value);
    const workDeductions = parseFloat(document.getElementById("workDeductions").value || 0);
    const otherDeductions = parseFloat(document.getElementById("otherDeductions").value || 0);
    // const superContributions = parseFloat(document.getElementById("superContributions").value || 0);
    const isMedicareExempt = document.getElementById("isMedicareExempt").checked;
    const hasHELP = document.getElementById("hasHELP").checked;
    const paygWithheld = parseFloat(document.getElementById("paygWithheld").value || 0);

    const result = calculateTotalTax({
      income,
      workDeductions,
      otherDeductions,
      // superContributions,
      isMedicareExempt,
      hasHELP,
      paygWithheld
    });

    const taxResultLabel = result.taxDue < 0 ? "Tax Rebate" : "Tax Payable";
    const taxResultValue = Math.abs(result.taxDue).toFixed(2);

    resultDiv.innerHTML = `
      <h2 class="font-bold text-xl mt-4">Results</h2>
      <p>Adjusted Income: $${result.adjustedIncome.toFixed(2)}</p>
      <p>Income Tax: $${result.incomeTax.toFixed(2)}</p>
      <p>Medicare Levy: $${result.medicareLevy.toFixed(2)}</p>
      <p>HELP Repayment: $${result.helpRepayment.toFixed(2)}</p>
      <p>Total Payable: $${result.totalTax.toFixed(2)}</p>
      <p>PAYG Withheld: $${result.paygWithheld.toFixed(2)}</p>
      <p class="font-semibold">${taxResultLabel}: $${taxResultValue}</p>
    `;
  });
});
