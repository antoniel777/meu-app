import React, { useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { Calendar, MapPin, Ticket } from 'lucide-react-native';

export default function EventoItem({
  titulo,
  descricao,
  imagem,
  data,
  local,
  valor
}) {
  // Estado para controlar a quantidade de reservas
  const [quantidade, setQuantidade] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.evento}>
        <Image style={styles.imagem} source={{ uri: imagem }} />
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
        
        <View style={styles.icone}>
          <Calendar size={14} color="gray" />
          <Text style={styles.texto}>{data}</Text>
        </View>

        <View style={styles.icone}>
          <MapPin size={14} color="gray" />
          <Text style={styles.texto}>{local}</Text>
        </View>

        <View style={styles.icone}>
          <Ticket size={14} color="gray" />
          <Text style={styles.texto}>${valor}</Text>
        </View>
      </View>

      <View style={styles.reserva}>
        <View style={styles.contador}>
          <Button title="+" onPress={() => setQuantidade(quantidade + 1)} />
          <Text style={styles.quantidade}>{quantidade}</Text>
          <Button title="-" onPress={() => setQuantidade(quantidade - 1)} />
        </View>

        <View>
          <Button
            title="reservar"
            onPress={() => Alert.alert('Reservar efetuada com sucesso')}
          />
        </View>
      </View>
    </View>
  );
}