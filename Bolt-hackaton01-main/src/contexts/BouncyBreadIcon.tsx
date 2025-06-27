// components/common/BouncyBreadIcon.tsx
import React from 'react';
import { Croissant } from 'lucide-react';

interface BouncyBreadIconProps {
  withSmoke?: boolean;
  className?: string;
}

const BouncyBreadIcon: React.FC<BouncyBreadIconProps> = ({ withSmoke = false, className = '' }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <Croissant className="w-6 h-6 text-white group-hover:animate-bounce-soft transition-transform duration-300" />
      {withSmoke && (
        <div className="absolute -top-2 left-3 animate-smoke text-gray-300 text-sm select-none">💨</div>
      )}
    </div>
  );
};

export default BouncyBreadIcon;
