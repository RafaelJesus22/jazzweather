import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {colors, fontSize, spacing} from '../config/styles';

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  color?: string;
  marginTop?: number;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading,
  disabled,
  marginTop,
  color,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{...styles.container, backgroundColor: color || colors.primary, marginTop}}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export {PrimaryButton};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.default,
    borderRadius: spacing.small,
    alignItems: 'center',
  },
  text: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: fontSize.button,
  },
});
