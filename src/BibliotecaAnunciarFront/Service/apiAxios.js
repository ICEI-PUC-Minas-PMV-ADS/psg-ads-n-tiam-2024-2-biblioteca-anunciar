import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Para rodar no mobile coloca seu ipv4 aqui
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
