import { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');

  const onSubmit = () => {
    if (titulo.length < 3 || titulo.length > 256) {
      return Alert.alert('Erro', 'Título deve ter entre 3 e 256 caracteres');
    }
    if (descricao.length < 3 || descricao.length > 256) {
      return Alert.alert('Erro', 'Descrição deve ter entre 3 e 256 caracteres');
    }
    if (local.length < 3 || local.length > 256) {
      return Alert.alert('Erro', 'Local deve ter entre 3 e 256 caracteres');
    }

    const dataEscolhida = new Date(data);
    const hoje = new Date();
    const umAnoDepois = new Date();
    umAnoDepois.setFullYear(hoje.getFullYear() + 1);

    if (isNaN(dataEscolhida.getTime()) || dataEscolhida <= hoje || dataEscolhida >= umAnoDepois) {
      return Alert.alert('Erro', 'Data deve ser futura e até no máximo 1 ano à frente');
    }

    const valorNumerico = Number(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 1 || valorNumerico >= 1000) {
      return Alert.alert('Erro', 'Valor deve ser maior que R$ 1,00 e menor que R$ 1.000,00');
    }

    Alert.alert('Sucesso', 'Evento cadastrado com sucesso!');
    onCancel();
  };

  const onCancel = () => {
    setTitulo('');
    setDescricao('');
    setLocal('');
    setData('');
    setValor('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Incluir Evento</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        maxLength={256}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        maxLength={256}
      />

      <TextInput
        style={styles.input}
        placeholder="Local"
        value={local}
        onChangeText={setLocal}
        maxLength={256}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (formato: AAAA-MM-DD)"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <View style={styles.botoesArea}>
        <Button title="Cancelar" onPress={onCancel} color="#666666" />
        <Button title="Confirmar" onPress={onSubmit} color="#2e7d32" />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    gap: 12
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16
  },
  botoesArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
});
