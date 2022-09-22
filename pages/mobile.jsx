import { useEffect, useState } from 'react'
// import { AEMHeadless } from '@adobe/aem-headless-client-js'
// import getGraphiqlCall from '../components/graphiql'

import tempM from '../public/_tempMobileGraphQL.json'
import Panel from '../components/Panel'
import MobileHeader from '../components/MobileHeader'


export default function Graphiql() {
  const [data, setData] = useState(null)
  const [type, setType] = useState('desktop')

  useEffect(() => {
    setData(tempM.data.pageList.items[0].panels)
    setType(tempM.data.pageList.items[0]._variation)
  }, [])
  

  return (
    <div className={"page"} style={{maxWidth: 800, margin: '0 auto'}} >
      {type === "mobile" && (
        <MobileHeader maxWidth={800} />
      )}
      {data && data.map((panel, index) => {
        return <Panel panel={panel} panelNr={index} settings={{type, }} key={index} />;
      })}
    </div>
  )
}