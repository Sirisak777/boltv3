import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Download, Filter, Calendar, History as HistoryIcon } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface Prediction {
  id: string;
  date: string;
  menuName: string;
  predictedQuantity: number;
  confidence?: number; 
  actualQuantity?: number | null;
}

const History: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const stored = localStorage.getItem(`predictions_history_${user.id}`);
    if (stored) {
      const parsed: Prediction[] = JSON.parse(stored).map((p: any) => ({
        ...p,
        predictedQuantity: Number(p.predictedQuantity),
        confidence: p.confidence ? Number(p.confidence) : undefined,
      }));
      setPredictions(parsed);
    }
    setLoading(false);
  }, [user]);

  const filtered = predictions.filter(item => {
    const matchProduct = !selectedProduct || item.menuName === selectedProduct;
    const matchDate = !selectedDate || format(new Date(item.date), 'yyyy-MM-dd') === selectedDate;
    return matchProduct && matchDate;
  });

  const downloadCSV = () => {
    const headers = [t('date'), t('product'), t('predictedQuantity')];
    const rows = filtered.map(item => [
      format(new Date(item.date), 'yyyy-MM-dd'),
      item.menuName,
      item.predictedQuantity.toString(),
    ]);

    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bakery_predictions_${format(new Date(), 'yyyyMMdd')}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text={t('loading')} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
              <HistoryIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('predictionHistory')}</h1>
              <p className="text-gray-600 dark:text-slate-300">{t('viewAndAnalyze')}</p>
            </div>
          </div>
          <button 
            onClick={downloadCSV}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>{t('downloadCSV')}</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="h-5 w-5 text-gray-600 dark:text-white" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('filters')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">{t('product')}</label>
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:border-none dark:text-white"
            >
              <option value="">{t('allProducts')}</option>
              {[...new Set(predictions.map(item => item.menuName))].map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-300">{t('date')}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-700 dark:border-none dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">{t('totalPredictions')}</h3>
          <p className="text-3xl font-bold text-purple-600">{filtered.length}</p>
          <p className="text-sm text-gray-600 dark:text-slate-300">{t('inSelectedFilters')}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden dark:bg-slate-800 dark:border-none">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('predictionRecords')}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('product')}</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('predictedQuantity')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800 dark:divide-slate-700">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500">
                    {t('noDataFound')}
                  </td>
                </tr>
              )}
              {filtered.map(item => (
                <tr key={`${item.id}-${item.date}`} className="hover:bg-gray-50 transition-colors dark:hover:bg-slate-600">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{format(new Date(item.date), 'yyyy-MM-dd')}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{item.menuName}</td>
                  <td className="px-6 py-4 text-sm text-right text-gray-900 dark:text-white">{item.predictedQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;