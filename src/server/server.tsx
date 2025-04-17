"use server";

type TaxBracket = {
    rate: number;
    amount: number;
  };

export async function calculateTax(formData: FormData) {
    const amount = formData.get("amount");

    const salary = Number(amount);

    let tax = 0;
    let taxableSalary = salary;

    // First ₦200,000 is tax-free
    if (taxableSalary <= 200000) {
        tax = 0;
    } else {
        taxableSalary -= 200000;

        // Next ₦500,000 taxed at 10%
        if (taxableSalary <= 500000) {
        tax += taxableSalary * 0.10;
        taxableSalary = 0;
        } else {
        tax += 500000 * 0.10;
        taxableSalary -= 500000;

        // Next ₦300,000 taxed at 15%
        if (taxableSalary <= 300000) {
            tax += taxableSalary * 0.15;
            taxableSalary = 0;
        } else {
            tax += 300000 * 0.15;
            taxableSalary -= 300000;

            // Remaining amount taxed at 20%
            tax += taxableSalary * 0.20;
        }
        }
    }

    const grossPay = salary;
    const netPay = grossPay - tax;

    console.log( {
        grossPay,
        tax,
        netPay
    });
}
