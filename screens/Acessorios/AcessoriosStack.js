import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Acessorios from './Acessorios';
import AcessoriosForm from './AcessoriosForm';

const Stack = createNativeStackNavigator();

const AcessoriosStack = () => {
  return (
    <>
    <Stack.Navigator>
        <Stack.Screen name="acessorios" component={Acessorios} 
        options={{ title: 'Acessorios' }} />
        <Stack.Screen name="acessorios-form"
         component={AcessoriosForm} 
         options={{ title: 'Fomulario' }} />
    </Stack.Navigator>
</>
  )
}

export default AcessoriosStack