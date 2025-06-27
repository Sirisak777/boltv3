// contexts/DensityContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Density = 'comfortable' | 'compact' | 'spacious';

interface DensityContextType {
  density: Density;
  setDensity: (value: Density) => void;
}

const DensityContext = createContext<DensityContextType>({
  density: 'comfortable',
  setDensity: () => {}, // default noop
});

export const DensityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [density, setDensity] = useState<Density>('comfortable');

  return (
    <DensityContext.Provider value={{ density, setDensity }}>
      {children}
    </DensityContext.Provider>
  );
};

export const useDensity = () => useContext(DensityContext);
