import React, { useState, useEffect } from 'react';

// A new, more detailed icon that resembles a Euro bill.
const EuroBillIcon: React.FC = () => (
    <svg width="60" height="30" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="20" rx="2" ry="2" fill="#ff4a22" />
    <text x="20" y="14" 
          fontFamily="Arial, sans-serif" 
          fontSize="12" 
          fill="#083028" 
          textAnchor="middle" 
          fontWeight="bold">
      €
    </text>
    <text x="4" y="7" fontFamily="monospace" fontSize="4" fill="#083028">20</text>
    <text x="36" y="7" fontFamily="monospace" fontSize="4" fill="#083028" textAnchor="end">20</text>
    <text x="4" y="17" fontFamily="monospace" fontSize="4" fill="#083028">20</text>
    <text x="36" y="17" fontFamily="monospace" fontSize="4" fill="#083028" textAnchor="end">20</text>
    <line x1="10" y1="4" x2="30" y2="4" stroke="#083028" strokeWidth="0.5" />
    <line x1="10" y1="16" x2="30" y2="16" stroke="#083028" strokeWidth="0.5" />
  </svg>
);


const Raindrop: React.FC = () => {
  // Adding a random horizontal drift for each bill
  const horizontalDrift = `${(Math.random() - 0.5) * 25}vw`; // Drifts between -12.5vw and +12.5vw

  const style: React.CSSProperties = {
    left: `${Math.random() * 100}vw`,
    animationDuration: `${2 + Math.random() * 3}s`, // Faster fall time (2-5 seconds)
    animationDelay: `${Math.random() * 15}s`, // Wider delay range to spread out the start times
    animationName: 'flutter',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    filter: 'drop-shadow(0 0 5px rgba(255, 74, 34, 0.8))',
    // Set the custom property for the CSS animation
    ['--horizontal-drift' as any]: horizontalDrift,
  };

  return (
    <div
      className="absolute top-[-50px]"
      style={style}
    >
      <EuroBillIcon />
    </div>
  );
};

interface RainProps {
  isRaining: boolean;
}

const Rain: React.FC<RainProps> = ({ isRaining }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isRaining) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isRaining]);

  const handleTransitionEnd = () => {
    if (!isRaining) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) {
    return null;
  }
  
  const numberOfDrops = 150; // More money!
  const drops = Array.from({ length: numberOfDrops }).map((_, index) => (
    <Raindrop key={index} />
  ));

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50 transition-opacity duration-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {drops}
    </div>
  );
};

export default Rain;