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
        clientes_id: '',
        concessionaria_id: '',
        acessorios_id: '',
    }


    const [clientes, setClientes] = useState([])
    const [concessionaria, setConcessionaria] = useState([])
    const [acessorios, setAcessorios] = useState([])

    const id = route.params?.id

    if (id >= 0) {
        carro = route.params?.carro
    }

    useEffect(() => {
        AsyncStorage.getItem('clientes').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setClientes(resultado)
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('concessionaria').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setConcessionaria(resultado)
        })
    }, []);
    useEffect(() => {
        AsyncStorage.getItem('acessorios').then(resultado => {
            resultado = JSON.parse(resultado) || []
            setAcessorios(resultado)
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
                                style={{ marginTop: 10 }}
                                selectedValue={values.clientes_id}
                                onValueChange={handleChange('clientes_id')}>
                                <Picker.Item label='Clientes' value='' />
                                {clientes.map((item, i) => (
                                    <Picker.Item key={i}
                                        label={item.nome}
                                        value={item.nome}
                                    />
                                ))}
                            </Picker>
                            {(errors.clientes_id && touched.clientes_id) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.clientes_id}
                                </Text>
                            }
                            <Picker
                                style={{ marginTop: 10 }}
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
                                style={{ marginTop: 10 }}
                                selectedValue={values.acessorios_id}
                                onValueChange={handleChange('acessorios_id')}>
                                <Picker.Item label='Acessorios' value='' />
                                {acessorios.map((item, i) => (
                                    <Picker.Item key={i}
                                        label={item.nome}
                                        value={item.nome}
                                    />
                                ))}
                            </Picker>
                            {(errors.acessorios_id && touched.acessorios_id) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.acessorios_id}
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