import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://vitorads.com.br',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
