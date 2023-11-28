import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Carros from './Carros';
import CarrosForm from './CarrosForm';

const Stack = createNativeStackNavigator();

const CarrosStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="carros" component={Carros}
                    options={{ title: 'Carros' }} />
                <Stack.Screen name="carros-form"
                    component={CarrosForm}
                    options={{ title: 'Fomulario' }} />
            </Stack.Navigator>
        </>
    )
}

export default CarrosStack