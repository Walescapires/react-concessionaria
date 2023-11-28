import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { mask } from 'remask'
import clienteValidator from '../../Validator/clienteValidator'

const ClienteForm = ({ navigation, route }) => {
  let clientes = {
    nome: '',
    DataNascimento: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
  }

  const id = route.params?.id

  if (id >= 0) {
    clientes = route.params?.clientes
  }

  function salvar(dados) {
    AsyncStorage.getItem('clientes').then(resultado => {

      const clientes = JSON.parse(resultado) || []

      if (id >= 0) {
        clientes.splice(id, 1, dados)

      } else {

        clientes.push(dados)
      }
      AsyncStorage.setItem('clientes', JSON.stringify(clientes))

      navigation.goBack()
    })
  }
  return (
    <>
      <ScrollView style={{ margin: 15 }}>
        <Text style={{ textAlign: 'center' }}>Formulário do Aluno</Text>
        <Formik
          initialValues={clientes}
          validationSchema={clienteValidator}
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
                label='Data de nascimento'
                value={values.DataNascimento}
                onChangeText={(value) => { setFieldValue('DataNascimento', mask(value, '99/99/9999')) }}
              />
              {(errors.DataNascimento && touched.DataNascimento) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.DataNascimento}
                </Text>
              }

              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='CPF'
                value={values.cpf}
                keyboardType='decimal-pad'
                onChangeText={(value) => { setFieldValue('cpf', mask(value, '999.999.999-99')) }}
              />
              {(errors.cpf && touched.cpf) &&
                <Text style={{ color: 'red', marginTop: 5 }}>
                  {errors.cpf}
                </Text>
              }
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Email'
                value={values.email}
                keyboardType='email-address'
                onChangeText={handleChange('email')}
              />
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Telefone'
                value={values.telefone}
                keyboardType='phone-pad'
                onChangeText={(value) => { setFieldValue('telefone', mask(value, '(99) 99999-9999')) }}
              />
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='CEP'
                value={values.cep}
                keyboardType='numeric'
                onChangeText={(value) => { setFieldValue('cep', mask(value, '99.999-999')) }}
              />
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Logradouro'
                value={values.logradouro}
                onChangeText={handleChange('logradouro')}
              />
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Complemento'
                value={values.complemento}
                onChangeText={handleChange('complemento')}
              />
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Numero'
                value={values.numero}
                keyboardType='numeric'
                onChangeText={handleChange('numero')}
              />
              <TextInput style={{ marginTop: 10 }}
                mode='outlined'
                label='Bairro'
                value={values.bairro}
                onChangeText={handleChange('bairro')}
              />

              <Button onPress={handleSubmit}>Salvar</Button>
            </View>
          )}
        </Formik>

      </ScrollView>
    </>
  )
}

export default ClienteForm