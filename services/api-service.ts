import axios from 'axios';

export async function criarEvento(evento: any) {

    const response = await axios.post('https://senai-evento.onrender.com/meu_usuario/eventos', evento);
    return response.data;
}

export async function atualizarEvento(eventoId: string, evento: any) {

    const response = await axios.put(`https://senai-evento.onrender.com/meu_usuario/eventos/${eventoId}`, evento);
    return response.data;
}

export async function excluirEvento(eventoId: string) {

    await axios.delete(`https://senai-evento.onrender.com/meu_usuario/eventos/${eventoId}`);
}

export async function consultarEventos() {

    const response = await axios.get('https://senai-evento.onrender.com/meu_usuario/eventos/');
    return response.data;
}  