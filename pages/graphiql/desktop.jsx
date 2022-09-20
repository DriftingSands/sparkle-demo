import { useEffect, useState } from 'react'
import graphqlString from '../../components/graphiql'
import { AEMHeadless } from '@adobe/aem-headless-client-js'
import query from '../../components/graphiql'

import temp from '../../public/_tempGraphIQL.json'
import Panel from '../../components/Panel'
import MobileHeader from '../../components/MobileHeader'


export default function Graphiql() {
  const [data, setData] = useState(null)
  const [type, setType] = useState('desktop')

  useEffect(() => {
    setData(temp.data.pageList.items[0].panels)
    setType(temp.data.pageList.items[0]._variation)
  }, [])
  

  return (
    <div className={"page"}>
      {data && data.map((panel, index) => {
        return <Panel panel={panel} settings={{type, }} key={index} />;
      })}
    </div>
  )
}