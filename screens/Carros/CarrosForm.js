import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import carrosValidator from '../../Validator/carrosValidator'

const CarrosForm = ({ navigation, route }) => {
    let carro = {
        modelo: '',
        ano: '',
        fabricante: '',
        cliente_id: '',
        concessionaria_id: '',
        acessorio_id: '',
    }

    const [carros, setCarros] = useState([])

    const id = route.params?.id

    if (id >= 0) {
        carro = route.params?.carro
    }

    useEffect(() => {
        AsyncStorage.getItem('cliente').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setCarros(resultado)
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('concessionaria').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setCarros(resultado)
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('acessorio').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setCarros(resultado)
        })
    }, []);

    function salvar(dados) {
        AsyncStorage.getItem('carro').then(resultado => {

            const carro = JSON.parse(resultado) || []

            if (id >= 0) {
                carro.splice(id, 1, dados)
            } else {
                carro.push(dados)
            }

            AsyncStorage.setItem('carro', JSON.stringify(carro))

            navigation.goBack()
        })
    }
    return (
        <>
            <ScrollView style={{ margin: 15 }}>
                <Formik
                    initialValues={carro}
                    validationSchema={carrosValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <View>

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Modelo'
                                value={values.modelo}
                                onChangeText={handleChange('modelo')}
                            />
                            {(errors.modelo && touched.modelo) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.modelo}
                                </Text>
                            }
                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Ano'
                                value={values.ano}
                                onChangeText={handleChange('ano')}
                            />
                            {(errors.ano && touched.ano) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.ano}
                                </Text>
                            }
                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Fabricante'
                                value={values.fabricante}
                                onChangeText={handleChange('fabricante')}
                            />
                            {(errors.fabricante && touched.fabricante) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.fabricante}
                                </Text>
                            }

                            <Picker
                                selectedValue={values.cliente_id}
                                onValueChange={handleChange('cliente_id')}>
                                <Picker.Item label='Cliente' value='' />
                                {cliente.map((item, i) => (
                                    <Picker.Item key={i}
                                        label={item.nome}
                                        value={item.nome}
                                    />
                                ))}
                            </Picker>
                            {(errors.cliente_id && touched.cliente_id) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.cliente_id}
                                </Text>
                            }
                            <Picker
                                selectedValue={values.concessionaria_id}
                                onValueChange={handleChange('concessionaria_id')}>
                                <Picker.Item label='Concessionaria' value='' />
                                {concessionaria.map((item, i) => (
                                    <Picker.Item key={i}
                                        label={item.nome}
                                        value={item.nome}
                                    />
                                ))}
                            </Picker>
                            {(errors.concessionaria_id && touched.concessionaria_id) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.concessionaria_id}
                                </Text>
                            }
                            <Picker
                                selectedValue={values.acessorio_id}
                                onValueChange={handleChange('acessorio_id')}>
                                <Picker.Item label='Acessorios' value='' />
                                {acessorio.map((item, i) => (
                                    <Picker.Item key={i}
                                        label={item.nome}
                                        value={item.nome}
                                    />
                                ))}
                            </Picker>
                            {(errors.acessorio_id && touched.acessorio_id) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.acessorio_id}
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

export default CarrosForm