import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import acessoriosValidator from '../../Validator/acessoriosValidator'
import { useState } from 'react'

const AcessoriosForm = ({ navigation, route }) => {
  let acessorios = {
    nome: '',
    valor: '',
  }
  const [selectedLanguage, setSelectedLanguage] = useState()

  const id = route.params?.id

  if (id >= 0) {

    acessorios = route.params?.acessorios
  }

  function salvar(dados) {

    AsyncStorage.getItem('acessorios').then(resultado => {

      const acessorios = JSON.parse(resultado) || []

      if (id >= 0) {
        acessorios.splice(id, 1, dados)

      } else {

        acessorios.push(dados)
      }
      AsyncStorage.setItem('acessorios', JSON.stringify(acessorios))

      navigation.goBack()
    })

  }
  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Formik
          initialValues={acessorios}
          validationSchema={acessoriosValidator}
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
                <Picker.Item label="Acessorios" value="" />
                <Picker.Item label="nenhum" value="Nenhum" />
                <Picker.Item label="bebeconforto" value="Bebe conforto" />
                <Picker.Item label="arcondicionado" value="Ar Condiconado" />
                <Picker.Item label="multimidia" value="Multimidia" />
              </Picker>

              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Valor'
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

export default AcessoriosForm