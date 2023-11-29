import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PaperProvider } from 'react-native-paper';
import ConcessionariaStack from './screens/Concessionaria/ConcessionariaStack';
import ClienteStack from './screens/Cliente/ClienteStack';
import AcessoriosStack from './screens/Acessorios/AcessoriosStack';
import OficinaStack from './screens/Oficina/OficinaStack';
import CarroStack from './screens/Carros/CarroStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Concessionária"
              component={ConcessionariaStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="garage-open" size={26} />
                ),
              }}
            />
             <Tab.Screen
              name="Clientes"
              component={ClienteStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="account-circle-outline" size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Acessórios"
              component={AcessoriosStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="view-headline" size={26} />
                  
                ),
              }}
            />
            <Tab.Screen
              name="Oficina"
              component={OficinaStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="oil" size={26} />
                  
                ),
              }}
            />
            <Tab.Screen
              name="Carros"
              component={CarroStack}
              options={{
                tabBarIcon: () => (
                  <MaterialCommunityIcons name="car-multiple" size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

