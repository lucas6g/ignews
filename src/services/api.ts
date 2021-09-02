import axios from 'axios'
// consumir api routes do next
export const api = axios.create({
  baseURL:'/api'
})

