export interface User {
  id: string;
  email: string;
  name: string;
  shopName: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  category: string;
  price: number;
}

export interface SalesData {
  id: string;
  productId: string;
  date: Date;
  quantity: number;
  revenue: number;
  userId: string;
}

export interface Prediction {
  id: string;
  productId: string;
  date: Date;
  predictedQuantity: number;
  confidence: number;
  actualQuantity?: number;
  userId: string;
  createdAt: Date;
}

export interface PredictionRequest {
  productId: string;
  historicalData: SalesData[];
  predictionDate: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type Language = 'en' | 'th';