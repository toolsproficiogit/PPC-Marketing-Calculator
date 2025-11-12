import React from 'react';

interface FormulaDisplayProps {
  title: string;
  formula: string;
  calculation: string;
  result: string;
}

const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ title, formula, calculation, result }) => {
  return (
    <div className="bg-slate-800 border border-slate-700 p-5 rounded-lg shadow-lg flex flex-col h-full">
      <h3 className="text-xl font-bold text-sky-400 mb-3">{title}</h3>
      <div className="text-slate-300 text-sm space-y-2 flex-grow">
        <p className="font-semibold text-slate-200">{formula}</p>
        <p className="font-mono text-base bg-slate-900 p-2 rounded-md whitespace-pre-wrap break-words">{calculation}</p>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-700">
        <p className="text-2xl font-bold text-emerald-400 text-right">{result}</p>
      </div>
    </div>
  );
};

export default FormulaDisplay;
