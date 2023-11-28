import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Concessionaria from './Concessionaria';
import ConcessionariaForm from './ConcessionariaForm';

const Stack = createNativeStackNavigator();

const ConcessionariaStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="concessionaria" component={Concessionaria}
                    options={{ title: 'Concessionaria' }} />
                <Stack.Screen name="concessionaria-form"
                    component={ConcessionariaForm}
                    options={{ title: 'Fomulario' }} />
            </Stack.Navigator>
        </>
    )
}

export default ConcessionariaStack