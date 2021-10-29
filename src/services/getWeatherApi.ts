/* eslint-disable prettier/prettier */
import axios from 'axios';
import uuid from 'react-native-uuid';
import {CityCep, CityWeather} from '../types/ICity';
import {WEATHER_API_KEY} from 'react-native-dotenv';

export const api = axios.create({
  baseURL: 'https://api.hgbrasil.com',
});

export const getCityWeather = (cityTarget: CityCep | CityWeather): Promise<CityWeather> => {
  const {uf, cidade, cep, logradouro} = cityTarget;
  const url = `/weather?key=${WEATHER_API_KEY}&city_name=${cidade},${uf}`;

  return new Promise(async (resolve, reject) => {
    try {
      const response: any = await api.get(url);
      const {temp, date, time} = response.data.results;

      const cityWeather: CityWeather = {
        id: uuid.v4().toString(),
        lastUpdate: `${date} ${time}`,
        temperatura: temp,
        logradouro,
        cidade,
        uf,
        cep,
      };
      resolve(cityWeather);
    } catch (error) {
      reject(error);
    }
  });
};
