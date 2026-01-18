import React from 'react';
import { CalculationResult } from '../types';
import { CURRENCY_FORMAT, COLORS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Props {
  results: CalculationResult;
}

const ResultsPanel: React.FC<Props> = ({ results }) => {
  
  const chartData = [
    { name: 'Income Protection', value: results.incomeReplacementTotal, color: COLORS.income },
    { name: 'Liabilities', value: results.liabilitiesTotal, color: COLORS.liabilities },
    { name: 'Liquidation Costs', value: results.liquidationCostTotal, color: COLORS.liquidation },
    { name: 'Other Needs', value: results.otherNeedsTotal, color: COLORS.others },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-brand-card rounded-3xl p-6 md:p-8 shadow-2xl border border-brand-light h-auto">
      <h2 className="text-xl font-serif text-white mb-2">Coverage Breakdown</h2>
      <p className="text-gray-400 text-sm mb-6">Based on your inputs, this is the projected protection you need.</p>

      <div className="bg-[#153328] rounded-2xl p-6 mb-8 text-center border border-brand-light/50">
        <span className="text-brand-orange text-xs font-bold tracking-widest uppercase block mb-1">Total Coverage Needed</span>
        <div className="text-4xl md:text-5xl font-serif text-white font-medium">
          {CURRENCY_FORMAT.format(results.grandTotal)}
        </div>
      </div>

      <div className="h-64 w-full relative">
        {results.grandTotal === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            Enter values to see breakdown
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => CURRENCY_FORMAT.format(value)}
                contentStyle={{ backgroundColor: '#0f281e', borderColor: '#244a3b', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-8 space-y-3">
        {chartData.map((item) => (
          <div key={item.name} className="flex justify-between items-center text-sm border-b border-brand-light/30 pb-2 last:border-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-gray-300">{item.name}</span>
            </div>
            <span className="text-white font-medium">{CURRENCY_FORMAT.format(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPanel;