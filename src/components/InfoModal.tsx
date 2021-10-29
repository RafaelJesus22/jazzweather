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
  close: () => void;
  title: string;
  message?: string;
  type: 'success' | 'error';
}

export const InfoModal: React.FC<ModalProps> = ({
  visible,
  close,
  title,
  message,
  type,
}) => {
  const buttonColor = type === 'success' ? colors.succsess : colors.delete;
  const animation =
    type === 'success'
      ? require('../assets/sunny.json')
      : require('../assets/storm.json');

  return (
    <Modal
      visible={visible}
      onRequestClose={close}
      animationType="slide"
      transparent>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.container}>
          <View style={styles.card}>
            <LottieView
              source={animation}
              autoPlay
              loop
              style={{height: 150}}
            />
            <View style={{width: '100%'}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
              <PrimaryButton title="OK" onPress={close} color={buttonColor} />
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
