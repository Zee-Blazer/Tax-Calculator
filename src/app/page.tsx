'use client';

import Image from "next/image";
import { useActionState } from "react";

// JS LOGO
import JsLogo from '@/assets/images.png';

// Server Action 
import { calculateTax } from "@/server/server";

const initialState = {
  grossPay: 0,
  tax: 0,
  netPay: 0
};

const calculateTaxReducer = async (_prevState: typeof initialState, formData: FormData) => {
  return await calculateTax(formData);
};

export default function Home() {

  const [state, formAction] = useActionState(calculateTaxReducer, initialState);

  if (state.tax > 0 || state.grossPay > 0) {
    alert(`
      Gross Pay: ₦${state.grossPay.toLocaleString()}
      Tax: ₦${state.tax.toLocaleString()}
      Net Pay: ₦${state.netPay.toLocaleString()}
    `);
  }

  return (
    <div className="bg-blue-100 h-screen">
      
      <div className="bg-white w-96 center_content px-3.5 py-3.5 shadow rounded-lg">
        <Image 
          src={ JsLogo } alt="Js Logo" 
          width={75} height={75} 
          className="mx-auto rounded-full"
        />

        <h1 className="text-2xl font-bold text-center">Tax Calculator</h1>

        <form action={ formAction } className="mt-6">
          <label className="font-medium">Annual Income (N)</label> <br />
          <input 
            placeholder="Enter your income"
            type="number"
            name="amount"
            className="w-full mt-1 border p-1.5 rounded border-gray-200"
          />

          <button className="text-center cursor-pointer bg-blue-500 text-white rounded p-1.5 w-full mt-4">
            Calculate Tax
          </button>
        </form>

      </div>

    </div>
  );
}
