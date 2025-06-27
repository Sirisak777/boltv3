import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle, TrendingUp, Target } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';


const BREAD_OPTIONS = [
  '12 MACARON', 'ARMORICAIN', 'ARTICLE 295', 'BAGUETTE', 'BAGUETTE APERO', 'BAGUETTE GRAINE', 'BANETTE',
  'BANETTINE', 'BOISSON 33CL', 'BOTTEREAU', 'BOULE 200G', 'BOULE 400G', 'BOULE POLKA', 'BRIOCHE',
  'BRIOCHE DE NOEL', 'BRIOCHETTE', 'BROWNIES', 'BUCHE 4PERS', 'BUCHE 6PERS', 'BUCHE 8PERS', 'CAFE OU EAU',
  'CAKE', 'CAMPAGNE', 'CARAMEL NOIX', 'CEREAL BAGUETTE', 'CHAUSSON AUX POMMES', 'CHOCOLAT', 'CHOU CHANTILLY',
  'COMPLET', 'COOKIE', 'COUPE', 'CROISSANT', 'CROISSANT AMANDES', 'CRUMBLE', 'CRUMBLECARAMEL OU PISTAE',
  'DELICETROPICAL', 'DEMI BAGUETTE', 'DEMI PAIN', 'DIVERS BOISSONS', 'DIVERS BOULANGERIE', 'DIVERS CONFISERIE',
  'DIVERS PATISSERIE', 'DIVERS SANDWICHS', 'DIVERS VIENNOISERIE', 'DOUCEUR D HIVER', 'ECLAIR',
  'ECLAIR FRAISE PISTACHE', 'ENTREMETS', 'FICELLE', 'FINANCIER', 'FINANCIER X5', 'FLAN', 'FLAN ABRICOT',
  'FONDANT CHOCOLAT', 'FORMULE PATE', 'FORMULE PLAT PREPARE', 'FORMULE SANDWICH', 'FRAISIER', 'FRAMBOISIER',
  'GACHE', 'GAL FRANGIPANE 4P', 'GAL FRANGIPANE 6P', 'GAL POIRE CHOCO 4P', 'GAL POIRE CHOCO 6P', 'GAL POMME 4P',
  'GAL POMME 6P', 'GALETTE 8 PERS', 'GD FAR BRETON', 'GD KOUIGN AMANN', 'GD NANTAIS', 'GD PLATEAU SALE',
  'GRAND FAR BRETON', 'GRANDE SUCETTE', 'GUERANDAIS', 'KOUIGN AMANN', 'MACARON', 'MERINGUE', 'MILLES FEUILLES',
  'MOISSON', 'NANTAIS', 'NID DE POULE', 'NOIX JAPONAISE', 'PAILLE', 'PAIN', 'PAIN AU CHOCOLAT', 'PAIN AUX RAISINS',
  'PAIN BANETTE', 'PAIN CHOCO AMANDES', 'PAIN DE MIE', 'PAIN GRAINES', 'PAIN NOIR', 'PAIN S/SEL',
  'PAIN SUISSE PEPITO', 'PALET BRETON', 'PALMIER', 'PARIS BREST', 'PATES', 'PLAQUE TARTE 25P', 'PLAT',
  'PLAT 6.50E', 'PLAT 7.00', 'PLAT 7.60E', 'PLAT 8.30E', 'PLATPREPARE5,50', 'PLATPREPARE6,00', 'PLATPREPARE6,50',
  'PLATPREPARE7,00', 'PT NANTAIS', 'PT PLATEAU SALE', 'QUIM BREAD', 'REDUCTION SUCREES 12', 'REDUCTION SUCREES 24',
  'RELIGIEUSE', 'ROYAL', 'ROYAL 4P', 'ROYAL 6P', 'SABLE F  P', 'SACHET DE CROUTON', 'SACHET DE VIENNOISERIE',
  'SACHET VIENNOISERIE', 'SAND JB', 'SAND JB EMMENTAL', 'SANDWICH COMPLET', 'SAVARIN', 'SEIGLE', 'SPECIAL BREAD',
  'SPECIAL BREAD KG', 'ST HONORE', 'SUCETTE', 'TARTE FINE', 'TARTE FRAISE 4PER', 'TARTE FRAISE 6P', 'TARTE FRUITS 4P',
  'TARTE FRUITS 6P', 'TARTELETTE', 'TARTELETTE CHOC', 'TARTELETTE COCKTAIL', 'TARTELETTE FRAISE', 'THE',
  'TRADITIONAL BAGUETTE', 'TRAITEUR', 'TRIANGLES', 'TROIS CHOCOLAT', 'TROPEZIENNE', 'TROPEZIENNE FRAMBOISE',
  'TULIPE', 'VIENNOISE', 'VIK BREAD'
];

const DAYS_OF_WEEK = [
  { th: 'จันทร์', en: 'Monday' },
  { th: 'อังคาร', en: 'Tuesday' },
  { th: 'พุธ', en: 'Wednesday' },
  { th: 'พฤหัสบดี', en: 'Thursday' },
  { th: 'ศุกร์', en: 'Friday' },
  { th: 'เสาร์', en: 'Saturday' },
  { th: 'อาทิตย์', en: 'Sunday' }
];

const Predictions: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { language } = useLanguage();

  const [menuName, setMenuName] = useState('');
  const [lastQuantity, setLastQuantity] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!menuName || !lastQuantity || !dayOfWeek) {
      setError(t('fillAllFields', 'กรุณากรอกข้อมูลให้ครบถ้วน'));
      return false;
    }
    if (isNaN(Number(lastQuantity))) {
      setError(t('quantityMustBeNumber', 'จำนวนเมื่อวานต้องเป็นตัวเลข'));
      return false;
    }
    return true;
  };

  const handlePredict = async () => {
    if (!validate()) return;
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const payload = {
        menu_name: menuName,
        prev_day_sales: Number(lastQuantity),
        day_of_week: Number(dayOfWeek),
      };

      const response = await axios.post('https://docker-api-bakery.onrender.com/predict/', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      setPrediction(response.data.predicted_quantity);

      if (user) {
        const historyKey = `predictions_history_${user.id}`;
        const existing = localStorage.getItem(historyKey);
        const history = existing ? JSON.parse(existing) : [];
        const newRecord = {
          id: Date.now(),
          date: new Date().toISOString(),
          menuName,
          predictedQuantity: response.data.predicted_quantity,
        };
        history.push(newRecord);
        localStorage.setItem(historyKey, JSON.stringify(history));
      }

    } catch (err) {
      console.error(err);
      setError(t('apiError', 'เกิดข้อผิดพลาดในการเรียก API'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl dark:bg-slate-800 space-y-6">
      <div className="flex flex-col items-center">
        <TrendingUp className="w-8 h-8 text-indigo-600 mb-1" />
        <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
          {t('predictSales', 'พยากรณ์ยอดผลิตขนมปัง')}
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 text-center">
          {t('description', 'ใช้ข้อมูลการขายล่าสุดเพื่อช่วยให้ AI พยากรณ์จำนวนขนมปังที่ควรผลิตในแต่ละวัน')}
        </p>
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium dark:text-slate-300">{t('selectProduct', 'ชื่อขนมปัง')}</span>
          <select
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="w-full mt-1 border px-3 py-2 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          >
            <option value="">-- {t('chooseOption', 'เลือก')} --</option>
            {BREAD_OPTIONS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium dark:text-slate-300">{t('lastDayQuantity', 'จำนวนที่ขายเมื่อวาน')}</span>
          <input
            type="number"
            min={0}                  // ไม่ให้กรอกต่ำกว่า 0
            value={lastQuantity}
            onChange={(e) => setLastQuantity(e.target.value)}
            placeholder={t('enterNumber', 'ใส่ตัวเลข')}
            className="w-full mt-1 border px-3 py-2 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium dark:text-slate-300">{t('dayOfWeek', 'วันของสัปดาห์')}</span>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full mt-1 border px-3 py-2 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          >
            <option value="">-- {t('chooseOption', 'เลือก')} --</option>
            {DAYS_OF_WEEK.map((day, index) => (
              <option key={index} value={index}>
                {language === 'th' ? day.th : day.en}
              </option>
            ))}
          </select>
        </label>

        {error && <div className="text-red-600 font-medium">{error}</div>}

        <button
          onClick={handlePredict}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 flex justify-center items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t('loading', 'กำลังประมวลผล...')}
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              {t('makePrediction', 'ทำนายยอดผลิต')}
            </>
          )}
        </button>
      </div>

      {prediction !== null && !isLoading && (
        <div className="bg-green-50 border border-green-300 p-6 rounded-lg text-center animate-bounce-soft">
          <CheckCircle className="mx-auto text-green-600 w-8 h-8 mb-2" />
          <p className="text-2xl font-bold text-green-800">
            {t('shouldProduce', 'ควรผลิต')} {prediction} {t('pieces', 'ชิ้น')}
          </p>
        </div>
      )}

      {isLoading && <LoadingSpinner size="lg" text={t('loading', 'กำลังประมวลผล...')} />}
    </div>
  );
};

export default Predictions;