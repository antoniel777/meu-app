import React, { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native'; // Importamos o StyleSheet aqui
import EventoItem from './evento-item';

const eventosIniciais = [
  {
    id: '1',
    titulo: 'Pesca da Tainha',
    imagem: 'https://oatlantico.com.br/wp-content/uploads/2023/08/Com-257-mil-tainhas-capturadas...', 
    descricao: 'A pesca da tainha será intensa no Pântano do Sul',
    local: 'Pântano do Sul, Florianópolis/SC',
    data: '30/Maio',
    valor: 99.99
  },
  {
    id: '2',
    titulo: 'Arrial do Senai',
    imagem: 'https://www.uema.br/wp-content/uploads/2017/07/arraial.jpg',
    descricao: 'Muita festa, quentão e pipoca',
    local: 'Distrito Industrial, São José/SC',
    data: '25/Junho',
    valor: 25.50
  },
  {
    id: '3',
    titulo: 'Arrial do Sesi',
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgly5GHuAUwlyQLfx1XigcSiLMZdM...', 
    descricao: 'Muitos prêmios e diversão',
    local: 'Pagani, Palhoça/SC',
    data: '12/Junho',
    valor: 49.90
  }
];

export default function EventoLista() {
  const [atualizando, setAtualizando] = useState(false);
  const [listaEventos, setListaEventos] = useState(eventosIniciais);

  const aoAtualizar = () => {
    setAtualizando(true);
    setTimeout(() => {
      setListaEventos([...eventosIniciais]);
      setAtualizando(false);
    }, 2000);
  };

  return (
    <FlatList


      data={listaEventos}
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
      refreshControl={
        <RefreshControl 
          refreshing={atualizando} 
          onRefresh={aoAtualizar} 
          colors={['#689F38']} 
          tintColor="#689F38" 
        />
      }
    />
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  }
});