import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Language } from '../types';

// Create Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation Resources
const resources = {
  en: {
    translation: {
      // Predictions
      makePrediction: 'Make Prediction',
      predictSales: 'Predict Sales',
      shouldProduce: 'Should Produce',
      pieces: 'pieces',
      predictionResult: "Tomorrow should produce '{{menu}}' about {{quantity}} pieces",
      description: "Our AI uses recent sales data to accurately forecast daily bread production needs.",

      // Form
      selectProduct: 'Select Product',
      lastDayQuantity: 'Last Day Quantity',
      enterNumber: 'Enter number',
      dayOfWeek: 'Day of Week',
      chooseOption: 'Choose',

      // Errors
      fillAllFields: 'Please fill in all fields',
      quantityMustBeNumber: 'Last day quantity must be a number',
      apiError: 'Error while calling API',

      // History
      predictionHistory: 'Prediction History',
      viewAndAnalyze: 'View and analyze your past predictions',
      downloadCSV: 'Download CSV',
      filters: 'Filters',
      product: 'Product',
      allProducts: 'All Products',
      date: 'Date',
      totalPredictions: 'Total Predictions',
      inSelectedFilters: 'In selected filters',
      predictionRecords: 'Prediction Records',
      predictedQuantity: 'Predicted Qty',
      noDataFound: 'No data found for the selected filters.',

      // Common
      loading: 'Loading...',

      // Settings page
      settings: 'Settings',
      'Manage your account and application preferences': 'Manage your account and application preferences',
      'Profile Information': 'Profile Information',
      name: 'Name',
      email: 'Email',
      shopName: 'Shop Name',
      'Save Changes': 'Save Changes',
      Security: 'Security',
      'Change Password': 'Change Password',
      'New Password': 'New Password',
      'Confirm New Password':'Confirm New Password',
      'Update your account password': 'Update your account password',
      Appearance: 'Appearance',
      Theme: 'Theme',
      Light: 'Light',
      Dark: 'Dark',

      // Navigation
      backToHome: "Back to Home",

      auth: {
        logoAlt: 'Nom Pung Meaw Logo',
        title: 'Nom Pang Maeo',
        subtitle: 'Nom Pang Maeo',
        description: 'Reduce waste, increase profits, and optimize your production with our intelligent sales forecasting system.',
        feature1: 'AI-powered sales predictions',
        feature2: 'Reduce food waste',
        feature3: 'Optimize daily production planning',
        invalidEmail: 'Invalid email address',
        passwordTooShort: 'Password must be at least 6 characters',
        invalidCredentials: 'Invalid email or password',
        loginFailed: 'Login failed, please try again',
        login: 'Login',
        welcomeBack: 'Welcome to the Bread Production Forecasting System',
        demoAccount: 'Demo Account',
        email: 'Email',
        password: 'Password',
        loading: 'Loading...',
        signIn: 'Sign In',
        dontHaveAccount: "Don't have an account?",
        signUp: 'Sign Up',
        backToHome: "Back to Home",
        createAccount: 'Create Account',
        startPredicting: 'Start predicting your bakery sales',
        alreadyHaveAccount: "Already have an account?",
        "registrationSuccess": "Registration Successful",
        "pleaseLogin": "Please login to continue",
        "goToLogin": "Go to Login",
      },
    }
  },
  th: {
    translation: {
      // Predictions
      makePrediction: 'ทำการพยากรณ์',
      predictSales: 'พยากรณ์ยอดขาย',
      shouldProduce: 'ควรผลิต',
      pieces: 'ชิ้น',
      predictionResult: "พรุ่งนี้ควรผลิต '{{menu}}' ประมาณ {{quantity}} ชิ้น",
      description: "ใช้ข้อมูลการขายล่าสุดเพื่อช่วยให้ AI พยากรณ์จำนวนขนมปังที่ควรผลิตในแต่ละวัน",

      // Form
      selectProduct: 'เลือกสินค้า',
      lastDayQuantity: 'จำนวนที่ขายเมื่อวาน',
      enterNumber: 'ใส่ตัวเลข',
      dayOfWeek: 'วันของสัปดาห์',
      chooseOption: 'เลือก',

      // Errors
      fillAllFields: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      quantityMustBeNumber: 'จำนวนเมื่อวานต้องเป็นตัวเลข',
      apiError: 'เกิดข้อผิดพลาดในการเรียก API',

      // History
      predictionHistory: 'ประวัติการพยากรณ์',
      viewAndAnalyze: 'ดูและวิเคราะห์การพยากรณ์ที่ผ่านมา',
      downloadCSV: 'ดาวน์โหลด CSV',
      filters: 'ตัวกรอง',
      product: 'สินค้า',
      allProducts: 'สินค้าทั้งหมด',
      date: 'วันที่',
      totalPredictions: 'จำนวนการพยากรณ์ทั้งหมด',
      inSelectedFilters: 'ในตัวกรองที่เลือก',
      predictionRecords: 'บันทึกการพยากรณ์',
      predictedQuantity: 'จำนวนที่พยากรณ์',
      noDataFound: 'ไม่พบข้อมูลสำหรับตัวกรองที่เลือก',

      // Common
      loading: 'กำลังโหลด...',

      // Settings page
      settings: 'ตั้งค่า',
      'Manage your account and application preferences': 'จัดการบัญชีและการตั้งค่าแอปพลิเคชันของคุณ',
      'Profile Information': 'ข้อมูลโปรไฟล์',
      name: 'ชื่อ',
      email: 'อีเมล',
      shopName: 'ชื่อร้าน',
      'Save Changes': 'บันทึกการเปลี่ยนแปลง',
      Security: 'ความปลอดภัย',
      'Change Password': 'เปลี่ยนรหัสผ่าน',
      'New Password': 'รหัสผ่านใหม่',
      'Confirm New Password':'ยืนยันรหัสผ่านใหม่',
      'Update your account password': 'อัปเดตรหัสผ่านบัญชีของคุณ',
      Appearance: 'รูปลักษณ์',
      Theme: 'ธีม',
      Light: 'สว่าง',
      Dark: 'มืด',

      // Navigation
      backToHome: "กลับหน้าแรก",

      auth: {
        logoAlt: 'โลโก้ หนมปังแมว',
        title: 'หนมปังแมว',
        subtitle: 'หนมปังแมว',
        description: 'ลดของเสีย เพิ่มกำไร และวางแผนการผลิตอย่างชาญฉลาดด้วยระบบพยากรณ์ยอดขายของเรา',
        feature1: 'ระบบพยากรณ์ยอดขายด้วย AI',
        feature2: 'ลดของเสียจากการผลิตได้',
        feature3: 'วางแผนการผลิตในแต่ละวันอย่างมีประสิทธิภาพ',
        invalidEmail: 'อีเมลไม่ถูกต้อง',
        passwordTooShort: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร',
        invalidCredentials: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        loginFailed: 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่',
        login: 'เข้าสู่ระบบ',
        welcomeBack: 'ยินดีต้อนรับสู่ระบบทำนายยอดผลิตขนมปัง',
        demoAccount: 'บัญชีทดลอง',
        email: 'อีเมล',
        password: 'รหัสผ่าน',
        loading: 'กำลังโหลด...',
        signIn: 'เข้าสู่ระบบ',
        dontHaveAccount: 'ยังไม่มีบัญชี?',
        signUp: 'สมัครสมาชิก',
        backToHome: "กลับหน้าแรก",
        createAccount: 'สร้างบัญชี',
        startPredicting: 'เริ่มทำนายยอดขายเบเกอรี่ของคุณ',
        alreadyHaveAccount: 'มีบัญชีอยู่แล้ว?',
        "registrationSuccess": "สร้างบัญชีสำเร็จ",
        "pleaseLogin": "กรุณาล็อกอินเพื่อเข้าสู่ระบบ",
        "goToLogin": "ไปที่ล็อกอิน",
      },
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('bakery_language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Provider
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bakery_language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('bakery_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
