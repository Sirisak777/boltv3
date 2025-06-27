import { Product, SalesData, Prediction } from '../types';
import { subDays, format } from 'date-fns';

export const mockProducts: Product[] = [
  { id: '1', name: 'Croissant', nameEn: 'Croissant', nameTh: 'ครัวซองต์', category: 'pastry', price: 45 },
  { id: '2', name: 'Milk Bread', nameEn: 'Milk Bread', nameTh: 'ขนมปังนม', category: 'bread', price: 35 },
  { id: '3', name: 'Baguette', nameEn: 'Baguette', nameTh: 'บาแกตต์', category: 'bread', price: 55 },
  { id: '4', name: 'White Bread', nameEn: 'White Bread', nameTh: 'ขนมปังขาว', category: 'bread', price: 30 },
  { id: '5', name: 'Whole Wheat Bread', nameEn: 'Whole Wheat Bread', nameTh: 'ขนมปังโฮลวีท', category: 'bread', price: 40 },
  { id: '6', name: 'Sweet Bread', nameEn: 'Sweet Bread', nameTh: 'ขนมปังหวาน', category: 'bread', price: 38 },
  { id: '7', name: 'Danish Pastry', nameEn: 'Danish Pastry', nameTh: 'เดนิช', category: 'pastry', price: 50 },
  { id: '8', name: 'Muffin', nameEn: 'Muffin', nameTh: 'มัฟฟิน', category: 'pastry', price: 42 },
];

// Generate mock sales data for the past 30 days
export const generateMockSalesData = (userId: string): SalesData[] => {
  const salesData: SalesData[] = [];
  
  for (let i = 0; i < 30; i++) {
    const date = subDays(new Date(), i);
    
    mockProducts.forEach(product => {
      // Generate realistic sales data with some randomness
      const baseQuantity = Math.floor(Math.random() * 50) + 20; // 20-70 pieces
      const weekendMultiplier = date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1;
      const quantity = Math.floor(baseQuantity * weekendMultiplier);
      
      salesData.push({
        id: `${product.id}-${format(date, 'yyyy-MM-dd')}`,
        productId: product.id,
        date,
        quantity,
        revenue: quantity * product.price,
        userId,
      });
    });
  }
  
  return salesData;
};

// Generate mock prediction data
export const generateMockPredictions = (userId: string): Prediction[] => {
  const predictions: Prediction[] = [];
  
  for (let i = 1; i <= 30; i++) {
    const date = subDays(new Date(), i);
    
    // Generate predictions for a few random products each day
    const selectedProducts = mockProducts.slice(0, Math.floor(Math.random() * 4) + 2);
    
    selectedProducts.forEach(product => {
      const predictedQuantity = Math.floor(Math.random() * 60) + 25;
      const confidence = Math.floor(Math.random() * 20) + 75; // 75-95%
      const actualQuantity = Math.floor(predictedQuantity * (0.8 + Math.random() * 0.4)); // ±20% variance
      
      predictions.push({
        id: `pred-${product.id}-${format(date, 'yyyy-MM-dd')}`,
        productId: product.id,
        date,
        predictedQuantity,
        confidence,
        actualQuantity,
        userId,
        createdAt: subDays(date, 1),
      });
    });
  }
  
  return predictions;
};

// Simulate AI prediction
export const simulatePrediction = async (productId: string, historicalData: SalesData[]): Promise<{ quantity: number; confidence: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simple prediction logic based on historical average with some AI-like variance
  const productData = historicalData.filter(data => data.productId === productId);
  const avgQuantity = productData.reduce((sum, data) => sum + data.quantity, 0) / productData.length;
  
  // Add some "AI intelligence" - consider recent trends
  const recentData = productData.slice(0, 7); // Last 7 days
  const recentAvg = recentData.reduce((sum, data) => sum + data.quantity, 0) / recentData.length;
  
  // Weighted prediction (70% recent trend, 30% overall average)
  const predictedQuantity = Math.floor(recentAvg * 0.7 + avgQuantity * 0.3);
  
  // Confidence based on data consistency
  const variance = productData.reduce((sum, data) => sum + Math.pow(data.quantity - avgQuantity, 2), 0) / productData.length;
  const confidence = Math.max(65, Math.min(95, 90 - (variance / avgQuantity) * 100));
  
  return {
    quantity: predictedQuantity,
    confidence: Math.floor(confidence),
  };
};