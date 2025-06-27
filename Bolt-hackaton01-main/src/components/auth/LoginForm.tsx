// src/components/auth/LoginForm.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('auth.invalidEmail'),
  password: z.string().min(6, 'auth.passwordTooShort'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToRegister: () => void;
  registerSuccess?: boolean;
  clearRegisterSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  registerSuccess,
  clearRegisterSuccess,
}) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // ซ่อน popup หลัง 4 วินาที
  useEffect(() => {
    if (registerSuccess && clearRegisterSuccess) {
      const timer = setTimeout(() => {
        clearRegisterSuccess();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [registerSuccess, clearRegisterSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');
    try {
      const success = await login(data.email, data.password);
      if (!success) {
        setLoginError(t('auth.invalidCredentials'));
      } else {
        navigate('/app/predictions');
      }
    } catch {
      setLoginError(t('auth.loginFailed'));
    }
  };

  return (
    <div className="w-full max-w-md relative">
      {/* Popup สร้างบัญชีสำเร็จ ทับหน้า */}
      {registerSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-green-100 border border-green-400 text-green-800 px-8 py-4 rounded-md text-lg font-medium shadow-lg select-none">
            {t('auth.accountCreatedSuccess') ||
              (t('language') === 'th'
                ? '🎉 สร้างบัญชีสำเร็จ กรุณาล็อกอิน'
                : '🎉 Account created successfully. Please login.')}
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <h2 className="font-prompt text-3xl font-bold text-gray-900 mb-2">{t('auth.login')}</h2>
        <p className="font-prompt text-gray-600">{t('auth.welcomeBack')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {loginError}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          <strong>{t('auth.demoAccount')}:</strong><br />
          Email: demo@bakery.com<br />
          Password: demo123
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('auth.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{t(errors.email.message || '')}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            {t('auth.password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{t(errors.password.message || '')}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              {t('auth.loading')}
            </div>
          ) : (
            t('auth.signIn')
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {t('auth.dontHaveAccount')}{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
          >
            {t('auth.signUp')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
