import { useEffect, useState } from 'react'
// import { AEMHeadless } from '@adobe/aem-headless-client-js'
// import getGraphiqlCall from '../components/graphiql'

import temp from '../public/_tempGraphIQL.json'
import Panel from '../components/Panel'


export default function Graphiql() {
  const [data, setData] = useState(null)
  const [type, setType] = useState('desktop')
  const [loadRest, setLoadRest] = useState(false)

  useEffect(() => {
    setData(temp.data.pageList.items[0].panels)
    setType(temp.data.pageList.items[0]._variation)
  }, [])

  const handleEndOfIntroAnimation = () => {
    setLoadRest(true)
  }
  

  return (
    <div className={"page"} >
      {data && data.map((panel, index) => {
        if (index > 0 && !loadRest) {
          document.body.style.overflowY = 'scroll'
          return null
        }
        return <Panel panel={panel} panelNr={index} settings={{type, }} key={index} runOnEnd={index === 0 ? handleEndOfIntroAnimation : null} />;
      })}
    </div>
  )
}