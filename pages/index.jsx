import { useContext, useEffect, useState } from 'react'
// import { AEMHeadless } from '@adobe/aem-headless-client-js'
// import getGraphiqlCall from '../components/graphiql'
import temp from '../public/_tempGraphIQL.json'
import tempM from '../public/_tempMobileGraphQL.json'
import Panel from '../components/Panel'
import MobileHeader from '../components/MobileHeader'
import { WindowSizeProvider } from '../components/ResizeProvider'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


export default function Graphiql() {
  const [data, setData] = useState(null)
  const [type, setType] = useState('master')
  const [loadRest, setLoadRest] = useState(false)
  
  const windowSize = useContext(WindowSizeProvider);
  useEffect(() => {
    if (windowSize.width === null) {return}
    setData(null);
  }, [windowSize])

  
  useEffect(() => {
    if (data !== null ) {return}
    if (windowSize.width > 800 || windowSize.width === null) {
      setData(temp.data.pageList.items[0].panels)
      setType(temp.data.pageList.items[0]._variation)
    } else {
      setData(tempM.data.pageList.items[0].panels)
      setType(tempM.data.pageList.items[0]._variation)
    }
    ScrollTrigger.refresh()
  }, [data])

  const handleEndOfIntroAnimation = () => {
    setLoadRest(true)
  }

  return !data ? null : (
    <div className={"page"} >
      {type === "mobile" && (<MobileHeader />)}
      {data && data.map((panel, index) => {
        if (type === 'master' && index > 0 && !loadRest) {
          document.body.style.overflowY = 'scroll'
          return null
        }
        return <Panel panel={panel} panelNr={index} settings={{type, }} key={index} runOnEnd={index === 0 ? handleEndOfIntroAnimation : null} />;
      })}
    </div>
  )
}