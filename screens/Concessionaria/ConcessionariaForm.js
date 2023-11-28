import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React from 'react'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import concessionariaValidator from '../../Validator/concessionariaValidator'

const ConcessionariaForm = ({ navigation, route }) => {
    let concessionarias = {
        nome: '',
        cnpj: '',
    }
    const [selectedLanguage, setSelectedLanguage] = useState()

    const id = route.params?.id

    if (id >= 0) {

        concessionarias = route.params?.concessionaria
    }

    function salvar(dados) {

        AsyncStorage.getItem('concessionaria').then(resultado => {

            const concessionaria = JSON.parse(resultado) || []

            if (id >= 0) {
                concessionaria.splice(id, 1, dados)

            } else {

                concessionaria.push(dados)
            }
            AsyncStorage.setItem('concessionaria', JSON.stringify(concessionaria))

            navigation.goBack()
        })

    }
    return (
        <>
            <ScrollView style={{ margin: 15 }}>
                <Text style={{ textAlign: 'center' }}>Formulário do Curso</Text>

                <Formik
                    initialValues={concessionarias}
                    validationSchema={concessionariaValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <View>

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='Nome'
                                value={values.nome}
                                onChangeText={handleChange('nome')}
                            />
                            {(errors.nome && touched.nome) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.nome}
                                </Text>
                            }

                            <TextInput style={{ marginTop: 10 }}
                                mode='outlined'
                                label='CNPJ'
                                value={values.cnpj}
                                keyboardType='decimal-pad'
                                onChangeText={(value) => { setFieldValue('cnpj', mask(value, '99.999.999/9999-99')) }}
                            />
                            {(errors.cnpj && touched.cnpj) &&
                                <Text style={{ color: 'red', marginTop: 5 }}>
                                    {errors.cnpj}
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

export default ConcessionariaForm