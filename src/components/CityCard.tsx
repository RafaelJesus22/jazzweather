/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {colors, fontSize, shadow, spacing} from '../config/styles';
import {CityWeather} from '../types/ICity';

interface CityCardProps extends TouchableOpacityProps {
  city: CityWeather;
}

export const CityCard: React.FC<CityCardProps> = ({city, onPress, ...rest}) => {
  const {cidade, temperatura, logradouro} = city;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
      {...rest}>
      <Text style={styles.temperature}>{temperatura}°</Text>

      <View style={styles.cityAdress}>
        <Text style={styles.cityName}>{cidade}</Text>
        {!!logradouro && <Text style={styles.cityState}>{logradouro}</Text>}
      </View>

      <View>
        <FontAwesome5 name="chevron-right" color={colors.text} size={16} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.large,
    backgroundColor: colors.background,
    borderRadius: spacing.small,
    marginBottom: spacing.default,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
    ...shadow,
  },
  temperature: {
    fontSize: fontSize.extraLarge,
    fontWeight: 'bold',
    color: colors.text,
  },
  cityAdress: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: spacing.default,
  },
  cityName: {
    fontSize: fontSize.text,
    color: colors.text,
    fontWeight: 'bold',
  },
  cityState: {
    fontSize: fontSize.note,
    color: colors.textLight,
  },
});
