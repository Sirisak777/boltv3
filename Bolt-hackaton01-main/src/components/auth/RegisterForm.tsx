import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Store, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, setRegisterSuccess }) => {
  const { t, i18n } = useTranslation();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const success = await registerUser(data);
    if (success) {
      setRegisterSuccess(true); // แสดง popup
      onSwitchToLogin();
    }
  };

  return (
    <>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.createAccount')}</h2>
          <p className="text-gray-600">{t('auth.startPredicting')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* ฟิลด์ชื่อ */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              {t('name')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('name')}
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Name"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* ฟิลด์ชื่อร้าน */}
          <div>
            <label htmlFor="shopName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('shopName')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Store className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('shopName')}
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Example Bakery"
              />
            </div>
            {errors.shopName && <p className="mt-1 text-sm text-red-600">{errors.shopName.message}</p>}
          </div>

          {/* ฟิลด์อีเมล */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...register('email')}
                type="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* ฟิลด์รหัสผ่าน */}
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
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {/* ปุ่มสมัคร */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                {t('loading')}
              </div>
            ) : (
              t('auth.createAccount')
            )}
          </button>
        </form>

        {/* ลิงก์สลับไปล็อกอิน */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <button onClick={onSwitchToLogin} className="text-orange-600 hover:text-orange-700 font-medium">
              {t('auth.signIn')}
            </button>
          </p>
        </div>
      </div>

      {/* Popup แจ้งเตือนสร้างบัญชีสำเร็จ */}
      {successPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              {i18n.language === 'th' ? 'สร้างบัญชีสำเร็จ' : 'Registration Successful'}
            </h3>
            <p className="mb-4">
              {i18n.language === 'th'
                ? 'กรุณาล็อกอินเพื่อเข้าสู่ระบบ'
                : 'Please login to continue'}
            </p>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium"
              onClick={() => {
                setSuccessPopupVisible(false);
                onSwitchToLogin(); // ไปหน้า Login เมื่อผู้ใช้กดเอง
              }}
            >
              {i18n.language === 'th' ? 'ไปที่ล็อกอิน' : 'Go to Login'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
