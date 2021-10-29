/* eslint-disable prettier/prettier */
export interface CityCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface CityWeather {
  id: string;
  temperatura: number;
  logradouro: string;
  cidade: string;
  uf: string;
  cep: string;
  lastUpdate: string;
}
