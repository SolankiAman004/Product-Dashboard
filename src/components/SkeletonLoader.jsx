import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="space-y-6 animate-fade">
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3 w-full">
                <div className="skeleton h-4 w-24 rounded"></div>
                <div className="skeleton h-8 w-16 rounded-lg"></div>
              </div>
              <div className="skeleton w-12 h-12 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar Skeleton */}
      <div className="card p-6 space-y-4">
        <div className="skeleton h-10 rounded-lg"></div>
        <div className="flex gap-4">
          <div className="skeleton h-10 flex-1 rounded-lg"></div>
          <div className="skeleton h-10 w-24 rounded-lg"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="card overflow-hidden">
        <div className="p-6">
          <div className="skeleton h-6 w-48 mb-4 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center gap-4 p-4 border-b border-slate-100">
                <div className="skeleton w-12 h-12 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="skeleton h-4 w-3/4 rounded"></div>
                  <div className="skeleton h-3 w-1/2 rounded"></div>
                </div>
                <div className="skeleton h-6 w-20 rounded-full"></div>
                <div className="skeleton h-6 w-16 rounded"></div>
                <div className="flex gap-2">
                  <div className="skeleton w-8 h-8 rounded-lg"></div>
                  <div className="skeleton w-8 h-8 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;