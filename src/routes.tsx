import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './pages/Home';
import {AddCity} from './pages/AddCity';
import {Screen} from './enums/screens';
import {CitiesProvider, useCities} from './providers/CitiesProvider';
import {CityDetails} from './pages/CityDetails';

const AppStack = createStackNavigator();

export const Routes = () => {
  const {selectedCity} = useCities();
  return (
    <CitiesProvider>
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen name={Screen.HOME} component={Home} />
          <AppStack.Screen name={Screen.ADD_CITY} component={AddCity} />
          <AppStack.Screen
            name={Screen.CITY_DETAILS}
            component={CityDetails}
            options={({ route }) => ({ title: route.params.cidade })}
          />
        </AppStack.Navigator>
      </NavigationContainer>
    </CitiesProvider>
  );
};
