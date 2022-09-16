import { useEffect, useState } from 'react'
import graphqlString from '../components/graphiql'
import { AEMHeadless } from '@adobe/aem-headless-client-js'
import query from '../components/graphiql'

import temp from '../public/_tempGraphIQL.json'
import Panel from '../components/Panel'


export default function Graphiql() {
  const [data, setData] = useState(null)

  const panels = temp.data.panelList.items
  

  return (
    <div className={"page"}>
      {panels.map((panel, index) => {
        return <Panel panel={panel} settings={{type: 'desktop'}} key={index} />;
      })}
    </div>
  )
}