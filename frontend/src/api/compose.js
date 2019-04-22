import axios from './base'

export async function fetchDockerCompose (id) {
  const resp = await axios.get(`/compose/${id}`)
  if (resp.data.code === 200) {
    return resp.data.data
  }
}

export async function updateDockerCompose (payload = {}) {
  const resp = await axios({
    method: 'PUT',
    url: `/compose`,
    data: payload
  })
  if (resp.data.code !== 200) {
    return resp.data.message
  }
}

export async function createDockerCompose (payload = {}) {
  const resp = await axios({
    method: 'POST',
    url: `/compose`,
    data: payload
  })
  if (resp.data.code !== 200) {
    return resp.data.message
  }
}
