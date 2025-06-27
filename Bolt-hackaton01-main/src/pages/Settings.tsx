import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings as SettingsIcon, User, Shield, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { useDensity } from '../contexts/DensityContext';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const { density } = useDensity();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [shopName, setShopName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // อัพเดตชื่อและชื่อร้าน เมื่อ user เปลี่ยน (โหลดมาใหม่)
  useEffect(() => {
    console.log('user:', user);
    if (user) {
      setName(user.name || '');
      setShopName(user.shopName || '');
    }
  }, [user]);


  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('http://localhost:5000/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user?.id, name, shopName }),
      });

      const data = await res.json();

      if (res.ok) {
        const updatedUser = {
          ...data.user,
          email: user?.email || '', // รักษา email เดิมไว้
        };
        setUser(updatedUser);
        setMessage(t('Profile updated successfully'));
      } else {
        setMessage(data.message || t('Failed to update profile'));
      }
    } catch (error) {
      setMessage(t('Error updating profile'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-br from-gray-500 to-slate-600 p-2 rounded-xl ">
            <SettingsIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings')}</h1>
        </div>
        <p className="text-gray-600 dark:text-slate-300">{t('Manage your account and application preferences')}</p>
      </div>

      <div
        className={`grid grid-cols-1 lg:grid-cols-3 ${
          density === 'compact' ? 'gap-2' : density === 'spacious' ? 'gap-8' : 'gap-6'
        }`}
      >
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('Profile Information')}</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">{t('name')}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">{t('email')}</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">{t('shopName')}</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-slate-700 dark:border-none dark:text-white"
                />
              </div>

              {message && (
                <p
                  className={`text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}
                >
                  {message}
                </p>
              )}

              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? t('Saving...') : t('Save Changes')}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Security */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Security')}</h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/app/change-password')}
                className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-slate-700 dark:text-white"
              >
                <p className="font-medium">{t('Change Password')}</p>
                <p className="text-sm text-gray-600 dark:text-slate-300">{t('Update your account password')}</p>
              </button>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-none">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="h-5 w-5 text-gray-600 dark:text-white" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Appearance')}</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-900 mb-2 dark:text-white">{t('Theme')}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      theme === 'light'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t('Light')}
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      theme === 'dark'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {t('Dark')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
