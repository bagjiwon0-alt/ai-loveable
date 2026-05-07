// Pinia 스토어에서 사용하는 axios 인스턴스 (json-server 연결)
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[API ERROR]', err?.message)
    return Promise.reject(err)
  }
)

export default api
