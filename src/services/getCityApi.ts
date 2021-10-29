/* eslint-disable prettier/prettier */
import axios from 'axios';

import {CityCep} from '../types/ICity';

export const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export const getCityByCEP = (CEP: string): Promise<CityCep> => {
  return new Promise(async (resolve, reject) => {
    const response: any = await api.get(`/${CEP}/json`);

    if (response.data.erro) {
      reject('CEP não encontrado');
    }

    const {
      cep,
      logradouro,
      complemento,
      bairro,
      localidade,
      uf,
      ibge,
      gia,
      ddd,
      siafi,
    } = response.data;

    resolve({
      cep,
      logradouro,
      complemento,
      bairro,
      cidade: localidade,
      uf,
      ibge,
      gia,
      ddd,
      siafi,
    } as CityCep);
  });
};
