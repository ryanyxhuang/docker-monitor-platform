import axios from './base'
import {objectFlattened} from '@/util'

export async function fetchLogListByContainer (must = [], structPlain = false) {
  const data = {
    query: {
      bool: {
        must: [
          {
            term: {_type: 'fluentd-docker'}
          }
        ]
      }
    }
  }

  data.query.bool.must = data.query.bool.must.concat(must)

  const resp = await axios({
    method: 'POST',
    url: `/elastic/_search`,
    data
  })

  if (resp.data.code !== 200) {
    return
  }

  const hits = resp.data.data.hits.hits
  if (!structPlain) {
    return hits
  }

  return hits.map((item) => {
    return objectFlattened(item)
  })
}
