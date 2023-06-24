import { WebClient } from '@/services/output-port'
import ky from 'ky'

const api = ky.create({ prefixUrl: 'http://localhost:3000' }).extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = window.localStorage.getItem('token')
        if (token) request.headers.set('Authorization', `Bearer ${token}`)
      },
    ],
    beforeRetry: [
      // refresh the token here
    ],
  },
})

const http = <K>(method: string, path: string, data?: K) =>
  api(path, { method, json: data })

export const webClient: WebClient = {
  get: (path: string) => http('get', path),
  mutate: (path: string, data: Object) => http('post', path, data),
  update: (path: string, data: Object) => http('put', path, data),
  remove: (path: string) => http('delete', path),
}
