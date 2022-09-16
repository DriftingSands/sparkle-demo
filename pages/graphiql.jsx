import { useEffect, useState } from 'react'
import graphqlString from '../components/graphiql'
import { AEMHeadless } from '@adobe/aem-headless-client-js'
import query from '../components/graphiql'
export default function Graphiql() {
  const [data, setData] = useState(null)

  
  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const aemHeadlessClient = new AEMHeadless({
      serviceURL: 'https://author-p54352-e657273.adobeaemcloud.com/',
      endpoint: 'sparkle-demo',
      auth: ['pz', 'pzaccess'],
  
    })
  
    aemHeadlessClient.runQuery(query, {
      method: 'POST',
      // 'Access-Control-Allow-Origin': '*',
      // mode: 'no-'
    })
      .then(data => console.log('DATA', data))
      .catch(err => console.warn(err))
    }
  }, [graphqlString])
  

  return (
    <div>graphql</div>
  )
}