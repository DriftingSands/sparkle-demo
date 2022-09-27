import { useContext, useEffect, useState } from 'react'
import { AEMHeadless } from '@adobe/aem-headless-client-js'
import Panel from '../components/Panel'
import MobileHeader from '../components/MobileHeader'
import { WindowSizeProvider } from '../components/ResizeProvider'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import desktopData from '../backup/desktop.json'
import mobileData from '../backup/mobile.json'


export default function Graphiql(props) {
  const [data, setData] = useState(null)
  const [type, setType] = useState('desktop')
  const [loadRest, setLoadRest] = useState(false)
  
  const windowSize = useContext(WindowSizeProvider);
  useEffect(() => {
    if (windowSize.width === null) {return}
    setData(null);

  }, [windowSize.width])


  useEffect(() => {
    if (windowSize.height === null) {return}
    ScrollTrigger.refresh()
  }, [windowSize.height])

  
  useEffect(() => {
    if (data !== null ) {return}
    if ((windowSize.width > 800 && windowSize.height > 400) || windowSize.width === null) {
      // props.shouldClientsideRender ? (
          setData(desktopData)
        // ) : (
        //   setData(props.desktopData)
        // )
      setType('desktop')

    } else {
      // props.shouldClientsideRender ? (
        setData(mobileData)
        // ) : (
        //   setData(props.mobileData)
        // )
      setType('mobile')
    }
    ScrollTrigger.refresh()
  }, [data, desktopData, mobileData, windowSize.width])

  const handleEndOfIntroAnimation = () => {
    setLoadRest(true)
  }

  return !data ? null : (
    <div className={"page"} >
      {type === "mobile" && (<MobileHeader />)}
      {data.pageByPath.item.panels.map((panel, index) => {
        // if (type === 'desktop' && index > 0 && !loadRest) {
        //   document.body.style.overflowY = 'scroll'
        //   return null
        // }
        return <Panel panel={panel} panelNr={index} settings={{type, }} key={index} runOnEnd={index === 0 ? handleEndOfIntroAnimation : null} />;
      })}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  )
}