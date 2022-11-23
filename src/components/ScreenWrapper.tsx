import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, spacing} from '../config/styles';

interface Props {
  children: React.ReactNode;
}

export const ScreenWrapper: React.FC<Props> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.default,
  },
});
