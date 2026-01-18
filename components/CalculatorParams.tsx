import React from 'react';
import { Info } from 'lucide-react';
import { CalculatorState } from '../types';
import { ASSET_LIQUIDATION_FEE_PERCENTAGE, CURRENCY_FORMAT } from '../constants';

interface Props {
  data: CalculatorState;
  onUpdate: (field: keyof CalculatorState, value: number) => void;
  liquidationCost: number;
}

const CalculatorParams: React.FC<Props> = ({ data, onUpdate, liquidationCost }) => {
  return (
    <div className="space-y-8">
      
      {/* SECTION 1: Income Replacement (Dials/Sliders) */}
      <section className="space-y-6">
        <h3 className="text-brand-orange text-sm font-bold uppercase tracking-wider mb-4">Income Protection</h3>
        
        {/* Monthly Expenses Slider */}
        <div className="bg-brand-light/30 p-6 rounded-2xl border border-brand-light">
          <div className="flex justify-between items-center mb-4">
            <label className="text-brand-orange font-semibold flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-orange rounded-full"></span>
              MONTHLY INCOME / EXPENSES
            </label>
            <span className="text-2xl font-serif text-white">{CURRENCY_FORMAT.format(data.monthlyExpenses)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="500"
            value={data.monthlyExpenses}
            onChange={(e) => onUpdate('monthlyExpenses', Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>RM 0</span>
            <span>RM 50k+</span>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="bg-brand-light/30 p-6 rounded-2xl border border-brand-light">
          <div className="flex justify-between items-center mb-4">
            <label className="text-brand-orange font-semibold flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-orange rounded-full"></span>
              PROTECTION DURATION
            </label>
            <span className="text-2xl font-serif text-white">{data.yearsToCover} Years</span>
          </div>
          
          <div className="bg-[#3a584c] text-[#aebdb6] text-sm p-3 rounded mb-4 flex gap-3 items-start">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-brand-orange" />
            <p>Rule of thumb: Experts recommend <strong>10-15 years</strong> of income protection to allow family readjustment.</p>
          </div>

          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={data.yearsToCover}
            onChange={(e) => onUpdate('yearsToCover', Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>1 Year</span>
            <span>30 Years</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Liabilities */}
      <section>
        <h3 className="text-brand-orange text-sm font-bold uppercase tracking-wider mb-4 border-t border-brand-light pt-6">Liabilities & Debts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput 
            label="Housing Loan Balance" 
            value={data.housingLoan} 
            onChange={(val) => onUpdate('housingLoan', val)} 
          />
          <NumberInput 
            label="Car Loan Balance" 
            value={data.carLoan} 
            onChange={(val) => onUpdate('carLoan', val)} 
          />
          <NumberInput 
            label="Credit Card Debt" 
            value={data.creditCardDebt} 
            onChange={(val) => onUpdate('creditCardDebt', val)} 
          />
          <NumberInput 
            label="Personal Loans" 
            value={data.personalLoans} 
            onChange={(val) => onUpdate('personalLoans', val)} 
          />
        </div>
      </section>

      {/* SECTION 3: Asset Liquidation (Special) */}
      <section className="bg-[#153328] p-6 rounded-2xl border border-dashed border-brand-light">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-brand-orange text-sm font-bold uppercase tracking-wider">Asset Liquidation Costs</h3>
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-500 cursor-help" />
            <div className="absolute left-0 bottom-6 w-64 p-3 bg-black text-xs text-white rounded shadow-lg hidden group-hover:block z-50">
              Costs related to unlocking frozen assets: Legal fees, Stamp duties, and Executor fees.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <NumberInput 
            label="Est. Property Value" 
            value={data.estimatedPropertyValue} 
            onChange={(val) => onUpdate('estimatedPropertyValue', val)} 
          />
          <NumberInput 
            label="Total Asset Value" 
            value={data.totalAssetValue} 
            onChange={(val) => onUpdate('totalAssetValue', val)} 
          />
        </div>

        <div className="mt-4 p-4 bg-brand-card rounded-xl flex justify-between items-center border border-brand-light">
          <div>
            <span className="text-sm text-gray-300 block">Est. Liquidation Cost (Read-Only)</span>
            <span className="text-[10px] text-gray-500">{(ASSET_LIQUIDATION_FEE_PERCENTAGE * 100)}% of Property & Assets</span>
          </div>
          <span className="text-xl font-bold text-red-400">
            {CURRENCY_FORMAT.format(liquidationCost)}
          </span>
        </div>
      </section>

      {/* SECTION 4: Other Needs */}
      <section>
        <h3 className="text-brand-orange text-sm font-bold uppercase tracking-wider mb-4 border-t border-brand-light pt-6">Other Financial Needs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberInput 
            label="Children Education" 
            value={data.childrenEducation} 
            onChange={(val) => onUpdate('childrenEducation', val)} 
          />
          <NumberInput 
            label="Emergency Fund" 
            value={data.emergencyFund} 
            onChange={(val) => onUpdate('emergencyFund', val)} 
          />
          <NumberInput 
            label="Funeral Expenses" 
            value={data.funeralExpenses} 
            onChange={(val) => onUpdate('funeralExpenses', val)} 
          />
        </div>
      </section>

    </div>
  );
};

const NumberInput: React.FC<{ label: string; value: number; onChange: (val: number) => void }> = ({ label, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas to get raw number string
    const rawValue = e.target.value.replace(/,/g, '');
    
    if (rawValue === '') {
      onChange(0);
      return;
    }

    // Only allow digits
    if (!/^\d*$/.test(rawValue)) {
      return; 
    }

    onChange(Number(rawValue));
  };

  // Format value with commas for display
  const displayValue = value === 0 ? '' : value.toLocaleString('en-US');

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-400 uppercase">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">RM</span>
        <input 
          type="text"
          inputMode="numeric"
          value={displayValue}
          placeholder="0"
          onChange={handleChange}
          className="w-full bg-brand-input border border-brand-light rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
        />
      </div>
    </div>
  );
};

export default CalculatorParams;
