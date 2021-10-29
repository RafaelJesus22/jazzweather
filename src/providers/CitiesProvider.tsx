import React, {useContext, createContext, useEffect} from 'react';
import { StorageKey } from '../enums/storage';
import {CityWeather} from '../types/ICity';
import {getCities} from '../utils/city';
import { getItem, setItem } from '../utils/storage';

interface CitiesProviderProps {
  cities: CityWeather[];
  selectedCity: CityWeather;
  setCities: React.Dispatch<React.SetStateAction<CityWeather[]>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<CityWeather>>;
  lastUpdate: string;
  handleSetLastUpdate: (time: string) => void;
}

export const CitiesContext = createContext<CitiesProviderProps>(
  {} as CitiesProviderProps,
);

export const CitiesProvider: React.FC = ({children}) => {
  const [cities, setCities] = React.useState<CityWeather[]>([]);
  const [selectedCity, setSelectedCity] = React.useState<CityWeather>(
    {} as CityWeather,
  );
  const [lastUpdate, setLastUpdate] = React.useState<string>('');

  const handleSetLastUpdate = async (time: string): Promise<void> => {
    setLastUpdate(time);
    await setItem(StorageKey.lastUpdate, time);
  };

  useEffect(() => {
    async function getStoragedCities(): Promise<void> {
      const storagedCities = await getCities();
      const storagedLastUpdate = await getItem(StorageKey.lastUpdate);
      
      setCities(storagedCities);
      setLastUpdate(storagedLastUpdate || '');
    }
    getStoragedCities();
  }, []);

  const value: CitiesProviderProps = {
    cities,
    setCities,
    selectedCity,
    setSelectedCity,
    lastUpdate,
    handleSetLastUpdate,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};

export const useCities = () => {
  const {
    cities,
    setCities,
    selectedCity,
    setSelectedCity,
    handleSetLastUpdate,
    lastUpdate,
  } = useContext(CitiesContext);
  
  return {
    cities,
    setCities,
    selectedCity,
    setSelectedCity,
    lastUpdate,
    handleSetLastUpdate,
  };
};
