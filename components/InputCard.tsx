import React, { useState, useEffect } from 'react';

interface InputCardProps {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  unit?: string;
  min: number;
  max: number;
  sliderMax?: number;
  step: number;
  icon: React.ReactNode;
}

const InputCard: React.FC<InputCardProps> = ({ id, label, value, onChange, unit, min, max, sliderMax, step, icon }) => {
  const [displayValue, setDisplayValue] = useState(value === null ? '' : value.toString());

  useEffect(() => {
    const stringValue = value === null ? '' : value.toString();
    // Only update display value from the parent state if it's different.
    // This prevents the cursor from jumping while the user is typing.
    if (displayValue !== stringValue) {
       setDisplayValue(stringValue);
    }
  }, [value]);


  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayValue(val);

    if (val === '' || val === '-') {
      onChange(null);
    } else {
      const numValue = parseFloat(val);
      if (!isNaN(numValue)) {
        onChange(numValue);
      }
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const numValue = parseFloat(e.target.value);
      if(!isNaN(numValue)) {
          onChange(numValue);
      }
  }

  return (
    <div className="bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
      <label htmlFor={id} className="flex items-center text-sm font-medium text-slate-200 mb-2">
        <span className="text-[#ff4a22]">{icon}</span>
        <span className="ml-2">{label}</span>
      </label>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          id={id}
          value={displayValue}
          onChange={handleNumberInputChange}
          min={min}
          max={max}
          step={step}
          className="w-2/3 bg-[#06241f] text-white rounded-md border-white/20 focus:ring-1 focus:ring-[#ff4a22] focus:border-[#ff4a22] block p-2.5 text-lg font-semibold"
        />
        {unit && <span className="text-slate-300 text-lg font-medium">{unit}</span>}
      </div>
      <input
        type="range"
        value={value ?? 0} // Use 0 for the slider if value is null
        onChange={handleRangeChange}
        min={min}
        max={sliderMax ?? max}
        step={step}
        className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mt-3 accent-[#ff4a22]"
      />
    </div>
  );
};

export default InputCard;
