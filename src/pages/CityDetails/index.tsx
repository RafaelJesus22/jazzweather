/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenWrapper} from '../../components/ScreenWrapper';
import {CityDetailCard} from '../../components/CityDetailCard';
import {useCities} from '../../providers/CitiesProvider';
import {PrimaryButton} from '../../components/PrimaryButton';
import {deleteCity} from '../../utils/city';
import {colors, spacing} from '../../config/styles';
import {InfoModal} from '../../components/InfoModal';
import {ConfirmModal} from '../../components/ConfirmModal';

export const CityDetails: React.FC<{navigation: any}> = ({navigation}) => {
  const {selectedCity, updateCities} = useCities();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);

  const handleDelete = async (): Promise<void> => {
    const {remainingCities, erro} = await deleteCity(selectedCity);

    if (erro) {
      return setModalError(true);
    }

    updateCities(remainingCities);
    setModalConfirm(false);
    setModalSuccess(true);
  };

  const handlePress = (): void => setModalConfirm(true);

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
      <InfoModal
        visible={modalSuccess}
        title={'Deu tudo certo!'}
        type="success"
        message={`Ao voltar para tela inicial você não verá mais a cidade ${selectedCity.cidade}`}
        close={(): void => {
          setModalSuccess(false);
          navigation.goBack();
        }}
      />
      <InfoModal
        visible={modalError}
        title={'Ops!'}
        type="error"
        message={`Ocorreu um error ao excluir a cidade ${selectedCity.cidade}. Tente novamente mais tarde`}
        close={(): void => setModalError(false)}
      />
      <ConfirmModal
        visible={modalConfirm}
        title={'Atenção!'}
        message={`Tem certeza que deseja excluir a cidade ${selectedCity.cidade}?`}
        onConfirm={(): Promise<void> => handleDelete()}
        onClose={(): void => setModalConfirm(false)}
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
