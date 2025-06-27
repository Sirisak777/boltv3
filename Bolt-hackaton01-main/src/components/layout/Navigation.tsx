import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { TrendingUp, History, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const { t } = useTranslation();

  const navItems = [
    { to: '/app/predictions', icon: TrendingUp, labelKey: 'predictSales' },
    { to: '/app/history', icon: History, labelKey: 'predictionHistory' },
    { to: '/app/settings', icon: Settings, labelKey: 'settings' },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 border-r border-amber-100 dark:border-slate-700 w-64 min-h-screen">
      <div className="p-6">
        <ul className="space-y-2">
          {navItems.map(({ to, icon: Icon, labelKey }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-700 dark:to-slate-800 text-orange-700 dark:text-white shadow-sm border border-orange-200 dark:border-slate-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{t(labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
