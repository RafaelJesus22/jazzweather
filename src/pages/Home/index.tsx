/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import { ScreenWrapper } from '../../components/ScreenWrapper';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ModalScreen } from '../../components/ModalScreen';
import { CityCard } from '../../components/CityCard';
import { Screen } from '../../enums/screens';
import { CityWeather } from '../../types/ICity';
import { useCities } from '../../providers/CitiesProvider';
import { colors, fontSize, spacing } from '../../config/styles';
import { updateAllCities } from '../../utils/city';
import NoCities from '../../assets/no_cities.svg';

export const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
  const [modalError, setModalError] = useState(false);
  const {
    cities,
    updateCities,
    lastUpdate,
    updateSelectedCity,
    updateLastUpdate,
  } = useCities();

  useEffect(() => {
    async function loadCities(): Promise<void> {
      await handleUpdateAllCities();
    }
    loadCities();
  }, []);

  const handleSelectCity = (city: CityWeather): void => {
    updateSelectedCity(city);
    navigation.navigate(Screen.CITY_DETAILS, { cidade: city.cidade });
  };

  const handleUpdateAllCities = async (): Promise<void> => {
    try {
      setLoading(true);
      const updatedCities = await updateAllCities();
      updateCities(updatedCities);
      updateLastUpdate(moment().format('DD/MM/YYYY hh:mm'));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setModalError(true);
    }
  };

  const CitiesContent: React.FC = () => (
    <View>
      <Text style={styles.details}>
        {/* {loading ? 'Atualizando' : `Ultima atualização: ${lastUpdate}`} */}
        {loading && 'Atualizando'}
        {!loading && 'Ultima atualização: ' + lastUpdate}
      </Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={cities}
        keyExtractor={(item: CityWeather) => item.id}
        renderItem={({ item }) => (
          <CityCard city={item} onPress={() => handleSelectCity(item)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleUpdateAllCities}
          />
        }
      />
    </View>
  );

  // const NoCitiesContent: React.FC = () => {
  //   return (
  //     <View style={styles.noCities}>
  //       <NoCities width={width * 0.8} height={width / 2} fill={colors.primary} />
  //       <Text style={styles.noCitiesText}>
  //         Adicione uma cidade para saber como está o clima 😉
  //       </Text>
  //     </View>
  //   );
  // };

  const ModalError: React.FC = () => (
    <ModalScreen
      visible={modalError}
      data={{
        type: 'error',
        title: 'Ops!',
        message: 'Estamos com problemas para atualizar os dados das cidades salvas. Tente novamente mais tarde',
        onClose: (): void => setModalError(false),
        confirmButton: {
          onPress: (): void => setModalError(false),
          color: colors.delete,
        },
      }}
    />
  );

  return (
    <ScreenWrapper>
      <>
        <View style={styles.content}>
          {/* {cities.length > 0 ? <CitiesContent /> : <NoCitiesContent />} */}
          <CitiesContent />
        </View>
        <PrimaryButton
          title="Adicionar Cidade"
          onPress={(): void => {
            navigation.navigate(Screen.ADD_CITY);
          }}
        />
        <ModalError />
      </>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, marginBottom: 32 },
  details: {
    fontSize: fontSize.text,
    color: colors.text,
    fontWeight: '600',
    marginRight: spacing.small,
  },
  list: {
    marginTop: spacing.medium,
    paddingTop: spacing.medium,
    paddingRight: spacing.small,
  },
  loading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noCities: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCitiesText: {
    fontSize: fontSize.button,
    color: colors.textSecondary,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '70%',
  },
});
