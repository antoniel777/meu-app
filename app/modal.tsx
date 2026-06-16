import { useState } from "react";
import {Alert,Button,StyleSheet,Text,TextInput,View,} from "react-native";
import { useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");

  const onSubmit = () => {
    if (titulo.length < 3 || titulo.length > 256) {
      return Alert.alert("Erro", "Título inválido");
    }

    if (descricao.length < 3 || descricao.length > 256) {
      return Alert.alert("Erro", "Descrição inválida");
    }

    if (local.length < 3 || local.length > 256) {
      return Alert.alert("Erro", "Local inválido");
    }

    const dataEvento = new Date(data);
    const hoje = new Date();

    const umAno = new Date();
    umAno.setFullYear(umAno.getFullYear() + 1);

    if (dataEvento <= hoje || dataEvento >= umAno) {
      return Alert.alert(
        "Erro",
        "A data deve ser maior que hoje e menor que 1 ano"
      );
    }

    const valorNumero = Number(valor);

    if (valorNumero < 1 || valorNumero > 1000) {
      return Alert.alert(
        "Erro",
        "O valor deve ser maior que R$1 e menor que R$1000"
      );
    }

    Alert.alert("Sucesso", "Evento cadastrado!");
    router.back();
  };

  const onCancel = () => {
    setTitulo("");
    setDescricao("");
    setLocal("");
    setData("");
    setValor("");

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título do evento"
      />

      <Text>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Informe a descrição"
      />

      <Text>Local</Text>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Informe o local"
      />

      <Text>Data</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
        placeholder="2026-06-20"
      />

      <Text>Valor</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        placeholder="100"
      />

      <View style={styles.botoes}>
        <Button title="Cancelar" onPress={onCancel} />
        <Button title="Confirmar" onPress={onSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});