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
import {InfoModal} from '../../components/InfoModal';
import {colors, fontSize, spacing} from '../../config/styles';
import {addCity, getCities, getTemperatureByCep} from '../../utils/city';
import {CitiesContext} from '../../providers/CitiesProvider';

export const AddCity: React.FC<{navigation: any}> = ({navigation}) => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const {setCities, handleSetLastUpdate} = useContext(CitiesContext);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    const cityWeather = await getTemperatureByCep(cep);

    if (!cityWeather.cidade) {
      setModalError(true);
      return setLoading(false);
    }

    let success = false;
    if (cityWeather) {
      success = await addCity(cityWeather);
    }

    if (success) {
      setModalSuccess(true);
      handleSetLastUpdate(cityWeather?.lastUpdate || '');
      const cities = await getCities();
      setCities(cities);

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

  return (
    <ScreenWrapper>
      <FormContainer>
        <View style={{flex: 1}}>
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
      <InfoModal
        visible={modalSuccess}
        title={'Deu tudo certo!'}
        type="success"
        message={`Ao voltar para tela inicial as novas informações já estarão disponíveis pra você😁`}
        close={(): void => {
          setModalSuccess(false);
          navigation.goBack();
        }}
      />
      <InfoModal
        visible={modalError}
        title={'Ops!'}
        type="error"
        message={`Ocorreu um erro ao procurar pelo CEP: ${cep}. Verifique se digitou certo e tente novamente!`}
        close={(): void => {
          setModalError(false);
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
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
