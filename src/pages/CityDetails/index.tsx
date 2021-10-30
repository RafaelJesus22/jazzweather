/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CityDetailCard} from '../../components/CityDetailCard';
import {useCities} from '../../providers/CitiesProvider';
import {PrimaryButton} from '../../components/PrimaryButton';
import {deleteCity} from '../../utils/city';
import {colors, spacing} from '../../config/styles';
import { ModalProps, ModalScreen } from '../../components/ModalScreen';

export const CityDetails: React.FC<{navigation: any}> = ({navigation}) => {
  const {selectedCity, updateCities} = useCities();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({} as ModalProps);

  const handleDelete = async (): Promise<void> => {
    const {remainingCities, erro} = await deleteCity(selectedCity);

    if (erro) {
      setModalVisible(false);
      setModalData(ERROR_MODAL_DATA);
      return setModalVisible(true);
    }

    updateCities(remainingCities);
    setModalVisible(false);
    setModalData(SUCCESS_MODAL_DATA);
    setModalVisible(true);
  };

  const handlePress = (): void => {
    setModalData(WARNING_MODAL_DATA);
    setModalVisible(true);
  };

  const SUCCESS_MODAL_DATA: ModalProps = {
    title: 'Deu tudo certo',
    message: `Ao voltar para tela inicial você não verá mais a cidade ${selectedCity.cidade}`,
    type: 'success',
    confirmButton: {
      color: colors.success,
      onPress: (): void => {
        setModalVisible(false);
        navigation.goBack();
      },
    },
  };

  const WARNING_MODAL_DATA: ModalProps = {
    title: 'Atenção!',
    message: `Tem certeza que deseja excluir a cidade ${selectedCity.cidade}?`,
    type: 'warning',
    confirmButton: {
      title: 'Excluir',
      color: colors.delete,
      onPress: (): Promise<void> => {
        return handleDelete();
      },
    },
    cancelButton: {
      color: colors.cancel,
      onPress: (): void => {
        setModalVisible(false);
      },
    },
  };

  const ERROR_MODAL_DATA: ModalProps = {
    title: 'Ops!',
    message: `Ocorreu um error ao excluir a cidade ${selectedCity.cidade}. Tente novamente mais tarde`,
    type: 'error',
    confirmButton: {
      color: colors.delete,
      onPress: (): void => {
        setModalVisible(false);
      },
    },
  };

  return (
    <ScreenWrapper>
      <View style={styles.detailsContainer}>
        <CityDetailCard city={selectedCity} />
      </View>
      <PrimaryButton
        title="Excluir"
        onPress={handlePress}
        color={colors.delete}
      />
      <ModalScreen
        visible={modalVisible}
        data={modalData}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    marginTop: spacing.large,
  },
});
