import React from 'react';
import { LucideIcon } from 'lucide-react';
import BouncyBreadIcon from '../../contexts/BouncyBreadIcon';
interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: string;
  isBread?: boolean; // <-- เพิ่มตรงนี้
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, gradient, isBread = false }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 relative">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${gradient} relative`}>
          {isBread ? (
            <BouncyBreadIcon withSmoke />
          ) : (
            Icon && <Icon className="h-6 w-6 text-white" />
          )}
        </div>

        {trend && (
          <div
            className={`flex items-center space-x-1 text-sm font-medium ${
              trend.isPositive ? 'text-green-600 glow-effect' : 'text-red-500'
            }`}
          >
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
        <p className="text-gray-600 dark:text-slate-300 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
