document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tax-form");
  const resultDiv = document.getElementById("results");

  if (!form || !resultDiv) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const income = parseFloat(document.getElementById("income").value);
    const workDeductions = parseFloat(document.getElementById("workDeductions").value || 0);
    const otherDeductions = parseFloat(document.getElementById("otherDeductions").value || 0);
    const isMedicareExempt = document.getElementById("isMedicareExempt").checked;
    const hasHELP = document.getElementById("hasHELP").checked;
    const paygWithheld = parseFloat(document.getElementById("paygWithheld").value || 0);

    if (isNaN(income) || income < 0) {
      resultDiv.innerHTML = '<p class="text-red-600">Please enter a valid income amount.</p>';
      return;
    }

    const result = calculateTotalTax({
      income,
      workDeductions,
      otherDeductions,
      isMedicareExempt,
      hasHELP,
      paygWithheld
    });

    const taxResultLabel = result.taxDue < 0 ? "Estimated Tax Refund" : "Total Tax Payable";
    const taxResultValue = Math.abs(result.taxDue).toFixed(2);

    resultDiv.innerHTML = `
      <h2 class="font-bold text-xl mt-4">Calculation Result</h2>
      <p>Adjusted Taxable Income: $${result.adjustedIncome.toFixed(2)}</p>
      <p>Base Income Tax: $${result.incomeTax.toFixed(2)}</p>
      <p>Medicare Levy: $${result.medicareLevy.toFixed(2)}</p>
      <p>HELP Repayment: $${result.helpRepayment.toFixed(2)}</p>
      <p>Total Tax: $${result.totalTax.toFixed(2)}</p>
      <p>PAYG Withheld: $${result.paygWithheld.toFixed(2)}</p>
      <p class="font-semibold text-blue-700">${taxResultLabel}: $${taxResultValue}</p>
    `;
  });
});
