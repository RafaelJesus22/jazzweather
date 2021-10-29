import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, shadow, spacing} from '../config/styles';
import {CityWeather} from '../types/ICity';

interface CityDetailCardProps {
  city: CityWeather;
}

type Line = {
  label: string;
  value: string;
};

export const CityDetailCard: React.FC<CityDetailCardProps> = ({city}) => {
  const {logradouro, uf, cep} = city;
  return (
    <View style={styles.container}>
      <Line label="CEP" value={cep} />
      {!!logradouro && <Line label="Endereço" value={logradouro} />}
      <Line label="UF" value={uf} />
    </View>
  );
};

const Line = ({label, value}: Line) => (
  <View style={styles.line}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: spacing.default,
    backgroundColor: colors.background,
    borderRadius: spacing.small,
    ...shadow,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.small,
  },
  label: {
    fontSize: 16,
    color: colors.textLight,
    marginRight: spacing.small,
  },
  value: {
    fontSize: 16,
    color: colors.textDark,
    textAlign: 'right',
    width: '70%',
  },
});
