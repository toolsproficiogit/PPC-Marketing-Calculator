import React from 'react';

interface OutputCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const OutputCard: React.FC<OutputCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-white/5 p-5 rounded-lg text-center transform transition-transform duration-300 hover:scale-105 hover:bg-white/10">
      <div className="flex items-center justify-center text-[#ff4a22] mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-slate-200 ml-2">{label}</h3>
      </div>
      <p className="text-3xl lg:text-4xl font-bold text-[#ff4a22] break-words">{value}</p>
    </div>
  );
};

export default OutputCard;