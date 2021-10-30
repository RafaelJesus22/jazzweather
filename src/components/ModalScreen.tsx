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

declare type ModalType = 'success' | 'error' | 'warning';

interface ModalButtonProps {
  title?: string;
  onPress: () => void;
  color: string;
}

export interface ModalProps {
  title: string;
  message: string;
  type: ModalType;
  confirmButton?: ModalButtonProps;
  cancelButton?: ModalButtonProps;
  onClose?: () => void;
}

interface Props {
  data: ModalProps;
  visible: boolean;
}

export const ModalScreen: React.FC<Props> = ({ data, visible }) => {
  const {
    title,
    message,
    type,
    confirmButton,
    cancelButton,
    onClose,
  } = data;

  const animations = {
    success: require('../assets/animations/sunny.json'),
    error: require('../assets/animations/storm.json'),
    warning: require('../assets/animations/warn.json'),
  };

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
              source={animations[type]}
              autoPlay
              loop
              style={styles.animatiom}
            />
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              {confirmButton && (
                <PrimaryButton
                  title={confirmButton.title || 'OK'}
                  onPress={confirmButton.onPress}
                  color={confirmButton.color}
                />
              )}
              {cancelButton && (
                <PrimaryButton
                  title={cancelButton.title || 'Cancelar'}
                  onPress={cancelButton.onPress}
                  color={cancelButton.color}
                  marginTop={spacing.small}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  animatiom: {
    height: 150,
  },
  container: {
    backgroundColor: '#f5f5f599',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
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
    marginVertical: spacing.default,
  },
});
