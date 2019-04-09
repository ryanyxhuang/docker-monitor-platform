import axios from 'axios'
import {BackendUrl} from '@/common/constants.js'
// const DEFAULTHOST = '192.168.99.116'
// const DEFAULTPORT = '2376'

export const instance = axios.create({
  // baseURL: 'api'
  baseURL: BackendUrl
})

// export function url (host, port, path) {
//   const h = host || DEFAULTHOST
//   const p = port || DEFAULTPORT
//   return `http://${h}:${p}/${path}`
// }

export default instance
