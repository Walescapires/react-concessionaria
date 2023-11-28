import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Oficina from './Oficina';
import OficinaForm from './OficinaForm';

const Stack = createNativeStackNavigator();

const OficinaStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="oficina" component={Oficina}
                    options={{ title: 'Oficina' }} />
                <Stack.Screen name="oficina-form"
                    component={OficinaForm}
                    options={{ title: 'Fomulario' }} />
            </Stack.Navigator>
        </>
    )
}

export default OficinaStack