import { criarEvento } from '@/services/api-service';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

dayjs.extend(customParseFormat);

export default function ModalScreen() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [tituloErro, setTituloErro] = useState('');
  const [descricao, setDescricao] = useState('');
  const [descricaoErro, setDescricaoErro] = useState('');
  const [local, setLocal] = useState('');
  const [localErro, setLocalErro] = useState('');
  const [data, setData] = useState('');
  const [dataErro, setDataErro] = useState('');
  const [valor, setValor] = useState('');
  const [valorErro, setValorErro] = useState('');
  const [imagem, setImagem] = useState('');
  const [imageErro, setImagemErro] = useState('');

  const isValid = () => {
    var isErro = false;

    if(titulo.length < 3 || titulo.length > 64) {
        setTituloErro('Título deve ter entre 3 e 64 caracteres');
        isErro = true;
    }

    if(descricao.length < 3 || descricao.length > 64) {
        setDescricaoErro('Descrição deve ter entre 3 e 64 caracteres');
        isErro = true;
    }

    if(local.length < 3 || local.length > 64) {
        setLocalErro('Local deve ter entre 3 e 64 caracteres');
        isErro = true;
    }

    var dataAtual = dayjs(data, 'DD/MM/YYYY');
    var dataMaxima = dayjs().add(1, 'year');

    if(dataAtual > dataMaxima) {
        setDataErro(`Data deve ser menor que ${dataMaxima.format('DD/MM/YYYY')}`);
        isErro = true;
    }

    if(Number(valor) < 1.0 || Number(valor) > 1000.0) {
        setValorErro('Valor deve ter $1 e $1000');
        isErro = true;
    }

    return isErro;
};

const clear = () => {
    
    setTituloErro('');
    setDescricaoErro('');
    setLocalErro('');
    setDataErro('');
    setValorErro('');
    setImagemErro('');
};

const onCancel = () => {
    router.back();
};

const onSubmit = async () => {

  clear();

  if (isFormularioComErro()) {
    return;
  }

  try {
    const evento = await criarEvento({
      titulo,
      descricao,
      local,
      data,
      valor,
    });

    Vibration.vibrate(1 * 1000);

    Alert.alert('Evento registrado com sucesso');

    router.back();
  } catch (err) {
    console.log(err);
    Alert.alert(`Erro ao criar evento ${err}`);
  }
};

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.formularioRotulo}>Cadastrar novo evento</Text>
      </View>
      <View style={styles.campoContainer}>
        <Text style={styles.campoRotulo}>Qual o título do evento?</Text>
        <TextInput placeholder="Ex: Pesca da Tainha" value={titulo} onChangeText={texto => setTitulo(texto)} />
        <Text style={styles.campoErro}>{tituloErro}</Text>
      </View>
      <View style={styles.campoContainer}>
        <Text style={styles.campoRotulo}>Qual a descrição evento?</Text>
        <TextInput value={descricao} onChangeText={texto => setDescricao(texto)} />
        <Text style={styles.campoErro}>{descricaoErro}</Text>
      </View>
      <View style={styles.campoContainer}>
        <Text style={styles.campoRotulo}>Qual a data do evento?</Text>
        <TextInput value={data} onChangeText={texto => setData(texto)} />
        <Text style={styles.campoErro}>{dataErro}</Text>
      </View>
      <View style={styles.campoContainer}>
        <Text style={styles.campoRotulo}>Qual a local do evento?</Text>
        <TextInput value={local} onChangeText={texto => setLocal(texto)} />
        <Text style={styles.campoErro}>{localErro}</Text>
      </View>
      <View style={styles.campoContainer}>
        <Text style={styles.campoRotulo}>Qual o valor do ingresso?</Text>
        <TextInput value={valor} onChangeText={texto => setValor(texto)} />
        <Text style={styles.campoErro}>{valorErro}</Text>
      </View>
      <View>
        <Button title="cancelar" onPress={onCancel} />
        <Button title="confirmar" onPress={onSubmit} />
      </View>
    </View>
  );
   }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formularioRotulo: {
    
    fontSize: 16,
    fontWeight: 600
  },
  campoContainer: {
    paddingVertical: 15,
  },
  campoRotulo: {
    color: 'gray'
  },
  campoErro: {
    fontSize: 12,
    color: 'red'
  },
});