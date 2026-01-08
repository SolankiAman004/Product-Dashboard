import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const StatsCard = ({ title, value, icon, color = 'primary', trend, percentage }) => {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-slate-500 to-slate-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
    error: 'from-error-500 to-error-600',
  };

  const bgColors = {
    primary: 'bg-primary-50',
    secondary: 'bg-slate-50',
    success: 'bg-success-50',
    warning: 'bg-warning-50',
    error: 'bg-error-50',
  };

  const renderTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend) {
      case 'up':
        return <FaArrowUp className="w-3 h-3 text-success-500" />;
      case 'down':
        return <FaArrowDown className="w-3 h-3 text-error-500" />;
      default:
        return <FaMinus className="w-3 h-3 text-slate-500" />;
    }
  };

  return (
    <div className={`card p-6  hover:scale-[1.02] transition-transform duration-300`}>
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900">
            {value}
          </p>
          
        </div>
        
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]} 
                       shadow-md shadow-${color}-500/20`}>
          <div className="text-white text-xl">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;