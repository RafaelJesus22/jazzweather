import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../config/styles';

export const ScreenWrapper: React.FC = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.default,
  }
});
