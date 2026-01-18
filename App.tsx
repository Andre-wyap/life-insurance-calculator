import React, { useState, useMemo, useCallback } from 'react';
import { CalculatorState, CalculationResult } from './types';
import { ASSET_LIQUIDATION_FEE_PERCENTAGE, CURRENCY_FORMAT } from './constants';
import CalculatorParams from './components/CalculatorParams';
import ResultsPanel from './components/ResultsPanel';
import LeadFormModal from './components/LeadFormModal';
import { Calculator } from 'lucide-react';

const INITIAL_STATE: CalculatorState = {
  monthlyExpenses: 5000,
  yearsToCover: 5,
  housingLoan: 0,
  carLoan: 0,
  creditCardDebt: 0,
  personalLoans: 0,
  estimatedPropertyValue: 0,
  totalAssetValue: 0,
  childrenEducation: 0,
  emergencyFund: 0,
  funeralExpenses: 0,
};

const App: React.FC = () => {
  const [data, setData] = useState<CalculatorState>(INITIAL_STATE);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Core Calculation Logic
  const results: CalculationResult = useMemo(() => {
    // 1. Income Replacement
    const incomeReplacementTotal = data.monthlyExpenses * 12 * data.yearsToCover;

    // 2. Liabilities
    const liabilitiesTotal = 
      (data.housingLoan || 0) + 
      (data.carLoan || 0) + 
      (data.creditCardDebt || 0) + 
      (data.personalLoans || 0);

    // 3. Asset Liquidation Costs (5% of Property + 5% of Assets)
    // Note: The prompt asks for these to be separate inputs but similar fee logic
    const propertyFees = (data.estimatedPropertyValue || 0) * ASSET_LIQUIDATION_FEE_PERCENTAGE;
    const assetFees = (data.totalAssetValue || 0) * ASSET_LIQUIDATION_FEE_PERCENTAGE;
    const liquidationCostTotal = propertyFees + assetFees;

    // 4. Other Needs
    const otherNeedsTotal = 
      (data.childrenEducation || 0) + 
      (data.emergencyFund || 0) + 
      (data.funeralExpenses || 0);

    const grandTotal = incomeReplacementTotal + liabilitiesTotal + liquidationCostTotal + otherNeedsTotal;

    return {
      incomeReplacementTotal,
      liabilitiesTotal,
      liquidationCostTotal,
      otherNeedsTotal,
      grandTotal
    };
  }, [data]);

  const handleUpdate = useCallback((field: keyof CalculatorState, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark pb-20">
      {/* Header */}
      <header className="pt-12 pb-8 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
          Plan for the <span className="text-brand-orange italic">Unexpected</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Use our calculator to estimate how much coverage you actually need to protect your family's future.
        </p>
      </header>

      {/* Main Content Grid */}
      <main className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          
          {/* Left Panel: Inputs */}
          <div className="w-full xl:w-7/12 bg-brand-card rounded-3xl p-6 md:p-8 shadow-2xl border border-brand-light">
            <h2 className="text-2xl font-serif mb-2 text-white">Coverage Parameters</h2>
            <p className="text-gray-400 text-sm mb-8">Adjust the dials and fields below to match your financial situation.</p>
            
            <CalculatorParams 
              data={data} 
              onUpdate={handleUpdate} 
              liquidationCost={results.liquidationCostTotal}
            />

            <div className="mt-8 pt-6 border-t border-brand-light flex justify-end sticky bottom-0 bg-brand-card z-10">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-auto bg-brand-orange hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-3 text-lg"
              >
                <Calculator className="w-6 h-6" />
                Calculate & Get Quote
              </button>
            </div>
          </div>

          {/* Right Panel: Visualization */}
          <div className="w-full xl:w-5/12 sticky top-8">
             <ResultsPanel results={results} />
          </div>

        </div>
      </main>

      {/* Popup Modal */}
      {isModalOpen && (
        <LeadFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          calculatorData={data}
          results={results}
        />
      )}
    </div>
  );
};

export default App;
