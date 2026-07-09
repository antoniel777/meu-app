import { consultarEventos } from '@/services/api-service';
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import EventoItem from './evento-item';

export default function EventoLista() {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function atualizarTela() {
    try {
      setIsLoading(true);

      const response = await consultarEventos();

      setEventos(response);
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    atualizarTela();
  }, []);

  return (
    <FlatList
      data={eventos}
      renderItem={({ item }) => (
        <EventoItem
          titulo={item.titulo}
          descricao={item.descricao}
          imagem={item.imagem}
          local={item.local}
          data={item.data}
          valor={item.valor}
        />
      )}
      keyExtractor={(item) => item.id}
      refreshing={isLoading}
      onRefresh={atualizarTela}
    />
  );
} 