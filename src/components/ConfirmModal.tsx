/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {colors, fontSize, shadow, spacing} from '../config/styles';
import {PrimaryButton} from './PrimaryButton';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
}

export const ConfirmModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  message,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
      transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.card}>
            <LottieView
              source={require('../assets/animations/warn.json')}
              autoPlay
              loop
              style={{height: 150}}
            />
            <View style={{width: '100%'}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <PrimaryButton
                title="Excluir"
                onPress={onConfirm}
                color={colors.delete}
              />
              <PrimaryButton
                title="Cancelar"
                onPress={onClose}
                color={colors.cancel}
                marginTop={spacing.small}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f599',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#fff',
    padding: spacing.default,
    borderRadius: spacing.small,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...shadow,
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  message: {
    fontSize: fontSize.default,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.default,
  },
});
