import React, {useContext, createContext, useEffect, useState} from 'react';
import {StorageKey} from '../enums/storage';
import {CityWeather} from '../types/ICity';
import {getCities} from '../utils/city';
import {getItem, setItem} from '../utils/storage';

interface Props {
  children: React.ReactNode;
}

interface CitiesProviderProps {
  cities: CityWeather[];
  selectedCity: CityWeather;
  lastUpdate: string;
  updateCities: (cities: CityWeather[]) => void;
  updateSelectedCity: (city: CityWeather) => void;
  updateLastUpdate: (time: string) => void;
}

export const CitiesContext = createContext<CitiesProviderProps>(
  {} as CitiesProviderProps,
);

export const CitiesProvider: React.FC<Props> = ({children}) => {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityWeather>(
    {} as CityWeather,
  );

  useEffect(() => {
    async function getStoragedCities(): Promise<void> {
      const storagedCities = await getCities();
      const storagedLastUpdate = await getItem(StorageKey.lastUpdate);

      setCities(storagedCities);
      setLastUpdate(storagedLastUpdate || '');
    }
    getStoragedCities();
  }, []);

  const updateLastUpdate = async (time: string): Promise<void> => {
    setLastUpdate(time);
    await setItem(StorageKey.lastUpdate, time);
  };

  const updateSelectedCity = (city: CityWeather): void => {
    setSelectedCity(city);
  };

  const updateCities = (updatedCities: CityWeather[]): void => {
    setCities(updatedCities);
  };

  const value: CitiesProviderProps = {
    cities,
    selectedCity,
    updateCities,
    updateSelectedCity,
    lastUpdate,
    updateLastUpdate,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};

export const useCities = () => {
  const {
    cities,
    updateCities,
    selectedCity,
    updateSelectedCity,
    updateLastUpdate,
    lastUpdate,
  } = useContext(CitiesContext);

  return {
    cities,
    updateCities,
    selectedCity,
    updateSelectedCity,
    lastUpdate,
    updateLastUpdate,
  };
};
