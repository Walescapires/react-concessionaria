import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import oficinaValidator from '../../Validator/oficinaValidator'

const OficinaForm = ({ navigation, route }) => {
    let oficina = {
        nome: '',
        valor: '',
    }
    const [selectedLanguage, setSelectedLanguage] = useState()

    const id = route.params?.id

    if (id >= 0) {

        oficina = route.params?.oficina
    }

    function salvar(dados) {

        AsyncStorage.getItem('oficina').then(resultado => {

            const oficina = JSON.parse(resultado) || []

            if (id >= 0) {
                oficina.splice(id, 1, dados)

            } else {

                oficina.push(dados)
            }
            AsyncStorage.setItem('oficina', JSON.stringify(oficina))

            navigation.goBack()
        })    
      }
  return (
    <>
    <ScrollView style={{ margin: 15 }}>
        <Formik
            initialValues={oficina}
            validationSchema={oficinaValidator}
            onSubmit={values => salvar(values)}
        >
            {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                <View>

                    {(errors.nome && touched.nome) &&
                        <Text style={{ color: 'red', marginTop: 5 }}>
                            {errors.nome}
                        </Text>
                    }

                    <Picker
                        selectedValue={values.nome}
                        onValueChange={handleChange('nome')}>
                        <Picker.Item label="Servico" value="" />
                        <Picker.Item label="Troca de oleo" value="Troca de oleo" />
                        <Picker.Item label="Revisão" value="Revisao" />
                        <Picker.Item label="Troca de pneus" value="Troca de pneus" />
                    </Picker>

                    <TextInput style={{ marginTop: 10 }}
                        mode='outlined'
                        label='Valor'
                        keyboardType='decimal-pad'
                        value={values.valor}
                        onChangeText={handleChange('valor')}
                    />
                    {(errors.valor && touched.valor) &&
                        <Text style={{ color: 'red', marginTop: 5 }}>
                            {errors.valor}
                        </Text>
                    }
                    <Button onPress={handleSubmit}>Salvar</Button>
                </View>
            )}
        </Formik>
    </ScrollView>
</>
  )
}

export default OficinaForm