import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100, label }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="progress-container">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};