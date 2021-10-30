/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import {ScreenWrapper} from '../../components/ScreenWrapper';
import {FormContainer} from '../../components/FormContainer';
import {PrimaryButton} from '../../components/PrimaryButton';
import {ModalProps, ModalScreen} from '../../components/ModalScreen';
import {colors, fontSize, spacing} from '../../config/styles';
import {addCity, getCities, getTemperatureByCep} from '../../utils/city';
import {CitiesContext} from '../../providers/CitiesProvider';

export const AddCity: React.FC<{navigation: any}> = ({navigation}) => {
  const {updateCities, updateLastUpdate} = useContext(CitiesContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modaldata, setModaldata] = useState<ModalProps>({} as ModalProps);
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState('');

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    const cityWeather = await getTemperatureByCep(cep);

    if (!cityWeather.cidade) {
      setModaldata(ERROR_MODAL_DATA);
      setModalVisible(true);
      return setLoading(false);
    }

    let success = false;
    if (cityWeather) {
      success = await addCity(cityWeather);
    }

    if (success) {
      setModaldata(SUCCESS_MODAL_DATA);
      setModalVisible(true);
      updateLastUpdate(cityWeather?.lastUpdate || '');
      const cities = await getCities();
      updateCities(cities);

      setLoading(false);
      setCep('');
    }
  };

  const handleChangeText = (text: string): void => {
    setCep(text);
    if (text.length === 9) {
      Keyboard.dismiss();
    }
  };

  const SUCCESS_MODAL_DATA: ModalProps = {
    title: 'Deu tudo certo',
    message: 'Ao voltar para tela inicial as novas informações já estarão disponíveis pra você😁',
    type: 'success',
    confirmButton: {
      color: colors.success,
      onPress: (): void => {
        setModalVisible(false);
        navigation.goBack();
      },
    },
  };

  const ERROR_MODAL_DATA: ModalProps = {
    title: 'Ops!',
    message: `Ocorreu um erro ao procurar pelo CEP: ${cep}. Verifique se digitou certo e tente novamente!`,
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
      <FormContainer>
        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Digite o Cep da cidade</Text>
            <TextInputMask
              type={'zip-code'}
              value={cep}
              onChangeText={handleChangeText}
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite"
              placeholderTextColor={colors.textLighter}
            />
          </View>
          <PrimaryButton
            title="Salvar"
            loading={loading}
            onPress={handleSubmit}
            disabled={loading || cep.length !== 9}
            color={cep.length !== 9 ? colors.primaryDisabled : colors.primary}
          />
        </View>
      </FormContainer>
      <ModalScreen
        visible={modalVisible}
        data={modaldata}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    color: colors.textSecondary,
    marginBottom: spacing.small,
    fontSize: fontSize.button,
  },
  input: {
    width: '100%',
    backgroundColor: colors.background,
    paddingVertical: spacing.small,
    color: colors.text,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 1,
    fontWeight: 'bold',
    fontSize: fontSize.large,
  },
});
