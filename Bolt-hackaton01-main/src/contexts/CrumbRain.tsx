// components/CrumbRain.tsx
import React from 'react';

const CrumbRain = () => {
  const crumbs = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    size: 6 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {crumbs.map((crumb) => (
        <div
          key={crumb.id}
          className="crumb"
          style={{
            left: `${crumb.left}%`,
            width: `${crumb.size}px`,
            height: `${crumb.size}px`,
            animationDelay: `${crumb.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CrumbRain;
