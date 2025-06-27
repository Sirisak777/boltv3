import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (registerSuccess) {
      const timer = setTimeout(() => {
        setRegisterSuccess(false);
      }, 2000); // 2 วินาที
      return () => clearTimeout(timer);
    }
  }, [registerSuccess]);

  return (
    <div className="min-h-screen bg-[url('/images/bread.jpg')] bg-cover bg-center flex items-center justify-center p-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-amber-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-3/4 left-1/3 w-16 h-16 bg-yellow-200 rounded-full opacity-25"></div>
      </div>

      {/* Language Switch */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex bg-gray-100 rounded-lg p-1 shadow-md">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === 'en'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🇺🇸 EN
          </button>
          <button
            onClick={() => setLanguage('th')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === 'th'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🇹🇭 TH
          </button>
        </div>
      </div>

      {/* Popup Overlay กลางจอ */}
      {registerSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-green-100 border border-green-400 text-green-800 px-8 py-4 rounded-md text-lg font-medium shadow-lg select-none">
            {language === 'th'
              ? '🎉 สร้างบัญชีสำเร็จ กรุณาล็อกอิน'
              : '🎉 Account created successfully. Please login.'}
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-6xl flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left side - Branding */}
        <div className="flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-12 flex-col justify-center relative">
          <div className="absolute inset-0 bg-black opacity-10"></div>

          <button
            onClick={() => navigate('/')}
            className="absolute top-8 left-8 flex items-center space-x-2 text-white hover:text-orange-300 transition z-20"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">{t('backToHome')}</span>
          </button>

          <div className="relative z-10">
            <div
              className="flex items-center space-x-3 mb-8 cursor-pointer hover:opacity-90"
              onClick={() => navigate('/')}
            >
              <img
                src="/images/nompangmaeo.png"
                alt={t('auth.logoAlt')}
                className="h-12 w-12 object-contain rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-anuphan text-white font-bold leading-tight">
                  {t('auth.title')}
                </h1>
                <p className="text-xs text-white text-opacity-80 font-light">
                  {t('auth.subtitle')}
                </p>
              </div>
            </div>

            <h2 className="font-pacifico text-4xl font-bold text-white mb-6 leading-tight">
              {t('auth.title')}
            </h2>

            <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
              {t('auth.description')}
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t('auth.feature1')}</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t('auth.feature2')}</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>{t('auth.feature3')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth forms */}
        <div className="w-full lg:w-1/2 p-12 flex flex-col items-center justify-center space-y-6 relative">
          {isLogin ? (
            <LoginForm
              onSwitchToRegister={() => setIsLogin(false)}
              registerSuccess={registerSuccess}
              clearRegisterSuccess={() => setRegisterSuccess(false)}
            />
          ) : (
            <RegisterForm
              onSwitchToLogin={() => setIsLogin(true)}
              setRegisterSuccess={setRegisterSuccess} // ส่งฟังก์ชันให้ RegisterForm เรียกตอนสมัครเสร็จ
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
