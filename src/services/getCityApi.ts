/* eslint-disable prettier/prettier */
import axios from 'axios';

import {CityCep} from '../types/ICity';

export const api = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export const getCityByCEP = (CEP: string): Promise<CityCep> => {
  return new Promise((resolve, reject) => {
    api.get(`/${CEP}/json`)
      .then(({ data }) => {
        if (data.erro) {
          reject('CEP não encontrado');
        }

        const cityCep: CityCep = {
          cep: data.cep,
          logradouro: data.logradouro,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          ibge: data.ibge,
          gia: data.gia,
          ddd: data.ddd,
          siafi: data.siafi,
        }

        resolve(cityCep);
      })
      .catch(reject);
  });
};
