import React from 'react';

const EnhancedLoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-24 h-24 border-4 border-slate-200 rounded-full"></div>
        
        {/* Spinning Ring */}
        <div className="absolute inset-0 w-24 h-24 border-4 border-primary-500 rounded-full 
                      border-t-transparent animate-spin"></div>
        
        {/* Inner Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 
                        rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="mt-8 text-center space-y-3">
        <h2 className="text-2xl font-bold text-gradient">Loading Dashboard</h2>
        <p className="text-slate-600">Please wait while we fetch your products...</p>
        
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3].map((dot) => (
            <div 
              key={dot}
              className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"
              style={{ animationDelay: `${dot * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoadingSpinner;