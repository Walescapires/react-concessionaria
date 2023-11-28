import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Button, Card, Dialog, FAB, IconButton, Portal, Text } from 'react-native-paper';

const Cliente = ({ navigation }) => {
  const [clientes, setClientes] = useState([])
  const [idExcluir, setIdExcluir] = useState(0)

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);


  useFocusEffect(
    React.useCallback(() => {

      carregarDados()

    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('clientes').then(resultado => {
      resultado = JSON.parse(resultado) || []

      setClientes(resultado)
    })
  }
  function confirmarExclusao(id) {
    setIdExcluir(id)
    setVisible(true)
  }

  function excluir() {
    clientes.splice(idExcluir, 1)
    AsyncStorage.setItem('clientes', JSON.stringify(clientes))
    carregarDados()
    setVisible(false)
  }
  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {clientes.map((item, i) => (
          <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
            <Card.Content>
              <Text variant="bodyMedium">Nome {item.nome}</Text>
              <Text >Endereço {item.endereco}</Text>
              <Text >E-mail {item.email}</Text>
              <Text >Telefone {item.telefone}</Text>
            </Card.Content>
            <Card.Actions>
              <IconButton
                icon='pencil-outline'
                onPress={() => navigation.push('cliente-form', { id: i, clientes: item })}
              />
              <IconButton
                icon='delete'
                onPress={() => confirmarExclusao(i)}
              />
            </Card.Actions>
          </Card>
        ))}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text variant="bodyMedium">Deseja excluir o registro?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={excluir}>Sim</Button>
              <Button onPress={hideDialog}>Não</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>

      <FAB
        icon="plus"
        size='small'
        style={{ position: 'absolute', right: 5, bottom: 5 }}
        onPress={() => navigation.push('cliente-form')}
      />
    </>
  )
}

export default Cliente