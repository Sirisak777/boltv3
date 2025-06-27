import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Shield, 
  Clock, 
  DollarSign,
  ChevronRight,
  Star,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Croissant,
  PieChart,
  Brain,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';  // <-- เพิ่มตรงนี้
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const heroBackgrounds = [
  '/images/b1.avif',
  '/images/b5.avif',
  '/images/b7.avif',
  '/images/b8.jpeg',
  '/images/b9.jpg',
  '/images/b11.jpg',
];

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();  // <-- ดึงสถานะล็อกอิน
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = useState(0);

  const features = [
    {
      icon: Brain,
      titleEn: 'AI-Powered Predictions',
      titleTh: 'การพยากรณ์ด้วย AI',
      descEn: 'Advanced machine learning algorithms analyze your sales patterns to predict tomorrow\'s demand with 90%+ accuracy.',
      descTh: 'อัลกอริทึมการเรียนรู้ของเครื่องขั้นสูงวิเคราะห์รูปแบบการขายของคุณเพื่อพยากรณ์ความต้องการของวันพรุ่งนี้ด้วยความแม่นยำ 90%+'
    },
    {
      icon: TrendingUp,
      titleEn: 'Reduce Food Waste',
      titleTh: 'ลดของเสีย',
      descEn: 'Optimize production quantities based on accurate forecasts, reducing waste by up to 30% while maintaining customer satisfaction.',
      descTh: 'เพิ่มประสิทธิภาพปริมาณการผลิตตามการพยากรณ์ที่แม่นยำ ลดของเสียได้ถึง 30% พร้อมรักษาความพึงพอใจของลูกค้า'
    },
    {
      icon: DollarSign,
      titleEn: 'Increase Profits',
      titleTh: 'เพิ่มกำไร',
      descEn: 'Smart inventory management and production planning help maximize revenue while minimizing costs and waste.',
      descTh: 'การจัดการสต็อกและการวางแผนการผลิตอย่างชาญฉลาดช่วยเพิ่มรายได้สูงสุดพร้อมลดต้นทุนและของเสีย'
    },
    {
      icon: Clock,
      titleEn: 'Save Time',
      titleTh: 'ประหยัดเวลา',
      descEn: 'Automated forecasting eliminates guesswork and manual calculations, giving you more time to focus on your craft.',
      descTh: 'การพยากรณ์อัตโนมัติช่วยขจัดการเดาและการคำนวณด้วยตนเอง ให้เวลาคุณมากขึ้นในการมุ่งเน้นฝีมือของคุณ'
    },
    {
      icon: PieChart,
      titleEn: 'Detailed Analytics',
      titleTh: 'การวิเคราะห์โดยละเอียด',
      descEn: 'Comprehensive reports and visualizations help you understand sales patterns and make data-driven decisions.',
      descTh: 'รายงานและการแสดงผลที่ครอบคลุมช่วยให้คุณเข้าใจรูปแบบการขายและตัดสินใจโดยใช้ข้อมูล'
    },
    {
      icon: Shield,
      titleEn: 'Secure & Reliable',
      titleTh: 'ปลอดภัยและเชื่อถือได้',
      descEn: 'Enterprise-grade security ensures your business data is protected with bank-level encryption and regular backups.',
      descTh: 'ความปลอดภัยระดับองค์กรรับประกันว่าข้อมูลธุรกิจของคุณได้รับการปกป้องด้วยการเข้ารหัสระดับธนาคารและการสำรองข้อมูลสม่ำเสมอ'
    }
  ];

  const testimonials = [
    {
      name: 'สมชาย ใจดี',
      nameEn: 'Somchai Jaidee',
      shop: 'Sweet Dreams Bakery',
      rating: 5,
      textTh: 'ระบบนี้ช่วยลดของเสียในร้านได้มากจริงๆ ตอนนี้รู้ว่าต้องทำขนมปังเท่าไหร่แต่ละวัน ไม่ต้องเดาแล้ว',
      textEn: 'This system really helped reduce waste in my shop. Now I know exactly how much bread to make each day without guessing.'
    },
    {
      name: 'มาลี สุขใส',
      nameEn: 'Malee Suksai',
      shop: 'Golden Crust Bakery',
      rating: 5,
      textTh: 'การพยากรณ์แม่นยำมาก ช่วยให้วางแผนการผลิตได้ดีขึ้น กำไรเพิ่มขึ้น 25% ในเดือนแรก',
      textEn: 'Very accurate predictions helped me plan production better. Profits increased by 25% in the first month.'
    },
    {
      name: 'วิชัย รุ่งเรือง',
      nameEn: 'Wichai Rungruang',
      shop: 'Artisan Bread Co.',
      rating: 5,
      textTh: 'ใช้งานง่าย ข้อมูลชัดเจน ทีมงานให้การสนับสนุนดีมาก แนะนำให้เพื่อนเบเกอรี่ใช้หมดแล้ว',
      textEn: 'Easy to use, clear data, excellent support team. I\'ve recommended it to all my bakery friends.'
    }
  ];

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ที่นี่ยังไม่เชื่อม backend นะ
    setSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl">
              <img 
                src="/images/nompangmaeo.png" 
                alt="Nom Pung Meaw Logo" 
                className="h-12 w-12 object-contain rounded-lg"
              />
            </div>
            <div>
              <h1 className="font-prompt text-xl font-bold text-gray-900">Nom Pang Maeo</h1>
              <p className="text-xs text-gray-500">Smart Sales Prediction</p>
            </div>
          </div>

            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
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

              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/app/predictions')}
                    className="font-anuphan bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>{language === 'th' ? 'ระบบทำนาย' : 'Forecasting System'}</span>
                  </button>
                  
                  <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
                    title={language === 'th' ? 'ออกจากระบบ' : 'Logout'}
                  >
                    <LogOut className="h-5 w-5" />
                  </button>

                </>
              ) : (
                <Link
                  to="/auth"
                  className="font-anuphan bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>{language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-fit overflow-hidden">
        {/* Background Images */}
        {heroBackgrounds.map((bg, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === bgIndex ? 1 : 0,
              zIndex: i === bgIndex ? 0 : -1,
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 z-10"></div>

        <section className="relative py-20 z-20">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl bg-white/10 backdrop-blur-lg p-10 md:p-14 flex flex-col justify-center items-center text-center min-h-[250px]">
              <h1
                className="relative text-5xl md:text-6xl font-bold mb-6 leading-relaxed"
                style={{ minHeight: '6rem' }}
              >
                {/* Stroke Layer */}
                <span
                  className={`absolute inset-0 ${language === 'th' ? 'font-anuphan' : 'font-pacifico'} pointer-events-none select-none`}
                  style={{
                    color: '#333',
                    zIndex: 0,
                    textShadow: `
                    4px 0px 0 #333,
                    4px 1px 0 #333,
                    4px -1px 0 #333
                  `
                }}
                >
                  {language === 'th' ? 'หนมปังแมว' : 'Nom Pang Maeo'}
                </span>

                {/* Text with Gradient */}
                <span
                  className={`relative bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-200 bg-clip-text text-transparent ${language === 'th' ? 'font-anuphan' : 'font-pacifico'}`}
                  style={{ zIndex: 1 }}
                >
                  {language === 'th' ? 'หนมปังแมว' : 'Nom Pang Maeo'}
                </span>
              </h1>

              <p className="font-anuphan text-xl text-white mb-8 leading-relaxed">
                {language === 'th'
                  ? 'ลดของเสีย เพิ่มกำไร และเพิ่มประสิทธิภาพการผลิตด้วยระบบพยากรณ์ยอดขายอัจฉริยะของเรา'
                  : 'Reduce waste, increase profits, and optimize your production with our intelligent sales forecasting system.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  to="/auth"
                  className="font-anuphan bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>{language === 'th' ? 'เริ่มใช้งานฟรี' : 'Start Free Trial'}</span>
                  <Zap className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'ฟีเจอร์ที่ทรงพลัง' : 'Powerful Features'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'th' 
                ? 'ทุกสิ่งที่คุณต้องการเพื่อเพิ่มประสิทธิภาพธุรกิจเบเกอรี่ของคุณ'
                : 'Everything you need to optimize your bakery business operations'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'th' ? feature.titleTh : feature.titleEn}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'th' ? feature.descTh : feature.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'วิธีการใช้งาน' : 'How It Works'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'th' 
                ? 'เริ่มต้นใช้งานได้ในเพียง 3 ขั้นตอนง่ายๆ'
                : 'Get started in just 3 simple steps'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'th' ? 'เลือกสินค้า' : 'Select Products'}
              </h3>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'เลือกสินค้าที่ต้องการพยากรณ์จากรายการสินค้าของคุณ'
                  : 'Choose which products you want to forecast from your product list'
                }
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'th' ? 'ป้อนข้อมูล' : 'Input Data'}
              </h3>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'กรอกข้อมูลยอดขายและข้อมูลที่เกี่ยวข้องเพื่อใช้ในการพยากรณ์'
                  : 'Enter sales data and relevant information for forecasting'
                }
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'th' ? 'รับผลการพยากรณ์' : 'Get Forecast'}
              </h3>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'ระบบจะแสดงปริมาณการผลิตที่แนะนำสำหรับวันถัดไป'
                  : 'The system will show recommended production quantities for the next day'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            {language === 'th' ? 'เสียงตอบรับจากลูกค้า' : 'Customer Testimonials'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 bg-amber-50 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-4 space-x-4">
                  <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{language === 'th' ? t.name : t.nameEn}</h3>
                    <p className="text-sm text-gray-500">{t.shop}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  {language === 'th' ? t.textTh : t.textEn}
                </p>

                <div className="flex space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-left">
            {language === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start bg-white rounded-3xl shadow-lg p-10 md:p-14">
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 12l-4-4-4 4m0 0l4 4 4-4m-4-4v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg text-gray-500 font-semibold">{language === 'th' ? 'อีเมล' : 'Email'}</p>
                  <a href="mailto:jakkrit.sukl@bumail.net" className="text-lg font-medium text-orange-600 hover:underline">
                    jakkrit.sukl@bumail.net
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5h2l3.6 7.59-1.35 2.45A1 1 0 008 17h9a1 1 0 00.92-.62l3-7A1 1 0 0020 8H6.42l-.95-2H3z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg text-gray-500 font-semibold">{language === 'th' ? 'โทรศัพท์' : 'Phone'}</p>
                  <a href="tel:0912345678" className="text-lg font-medium text-orange-600 hover:underline">
                    091-234-5678
                  </a>
                </div>
              </div>

              {/* Social */}
              <div>
                <p className="text-lg text-gray-500 font-semibold mb-2">
                  {language === 'th' ? 'ติดตามเรา' : 'Follow us'}
                </p>
                <div className="flex space-x-6 mt-2">
                  {/* Facebook */}
                  <a href="https://facebook.com/nompangmaeo" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg className="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.008 3.662 9.133 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.338 21.133 22 17.008 22 12z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://instagram.com/nompangmaeo" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                    <svg className="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.88a.88.88 0 110 1.75.88.88 0 010-1.75z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Optional: Right side image */}
            <div className="hidden md:block ml-auto">
              <img
                src="/images/nompangmaeo.png"
                alt="Contact Illustration"
                className="w-64 h-auto rounded-2xl shadow-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-white border-t border-amber-100 py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          &copy; 2025 Nom Pang Maeo. {language === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
