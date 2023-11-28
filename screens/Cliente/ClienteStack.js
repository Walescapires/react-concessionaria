import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Cliente from './Cliente';
import ClienteForm from './ClienteForm';

const Stack = createNativeStackNavigator();

const ClienteStack = () => {
  return (
    <>
    <Stack.Navigator>
        <Stack.Screen name="clientes" component={Cliente} options={{ title: 'Clientes' }} />
        <Stack.Screen name="cliente-form" component={ClienteForm} options={{ title: 'Formulario' }} />        
    </Stack.Navigator>
</>
  )
}

export default ClienteStack