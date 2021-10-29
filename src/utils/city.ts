/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';
import {StorageKey} from '../enums/storage';
import {getCityByCEP} from '../services/getCityApi';
import {getCityWeather} from '../services/getWeatherApi';
import {CityCep, CityWeather} from '../types/ICity';
import {toOnlyNumbers} from './format';
import {getItem, setItem} from './storage';
import moment from 'moment';

type DeleteCityReponse = {
  remainingCities: CityWeather[];
  erro?: boolean;
};

// obter temperatura a partir de um CEP
export const getTemperatureByCep = async (
  cep: string,
): Promise<CityWeather> => {
  try {
    const formattedCep = toOnlyNumbers(cep);
    const cidade: CityCep = await getCityByCEP(formattedCep);
    const cityWeather: CityWeather = await getCityWeather(cidade);
    return cityWeather;
  } catch (error: any) {
    return {} as CityWeather;
  }
};

// adicionar uma cidade ao storage
export const addCity = async (city: CityWeather): Promise<boolean> => {
  const storagedCities = await getItem(StorageKey.cities);
  const cities: CityWeather[] = storagedCities
    ? JSON.parse(storagedCities)
    : [];
  let success = false;

  if (cities.length === 0) {
    success = await setItem(StorageKey.cities, JSON.stringify([city]));
  } else {
    success = await setItem(
      StorageKey.cities,
      JSON.stringify([...cities, city]),
    );
  }
  await getCities();
  return success;
};

// retornar todas as cidades
export const getCities = async () => {
  try {
    const storagedCities = await getItem(StorageKey.cities);
    const cities = storagedCities ? JSON.parse(storagedCities) : [];

    return cities;
  } catch (error) {
    console.log(error);
    Alert.alert(
      'Erro',
      'Houve um erro ao obter as cidades salvas no aparelho...',
    );
  }
};

// deletar uma cidade
export const deleteCity = async (
  city: CityWeather,
): Promise<DeleteCityReponse> => {
  try {
    const storagedCities: CityWeather[] = await getCities();
    const cityToDelete = storagedCities.find(c => c.cidade === city.cidade);

    const remainingCities = storagedCities.filter(c => c !== cityToDelete);
    await setItem(StorageKey.cities, JSON.stringify(remainingCities));

    return {remainingCities};
  } catch (error) {
    console.log(error);
    return {remainingCities: [], erro: true};
  }
};

// atualizar todas as cidades
export const updateAllCities = async (): Promise<any> => {
  const storagedCities = await getCities();
  const cities: CityWeather[] = await Promise.all(
    storagedCities.map(async (city: CityWeather) => {
      const cityWeather: CityWeather = await getCityWeather(city);
      return cityWeather;
    }),
  );

  await setItem(StorageKey.cities, JSON.stringify(cities));
  await setItem(StorageKey.lastUpdate, moment().format('DD/MM/YYYY hh:mm'));

  return cities;
};
