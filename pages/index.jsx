import { useContext, useEffect, useState } from 'react'
import { AEMHeadless } from '@adobe/aem-headless-client-js'
import Panel from '../components/Panel'
import MobileHeader from '../components/MobileHeader'
import { WindowSizeProvider } from '../components/ResizeProvider'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// export async function getServerSideProps () {
//   if (process.env.NEXT_PUBLIC_SHOULD_CLIENTSIDE_RENDER.toLowerCase() === 'true') {
//     return {
//       props: {
//         shouldClientsideRender: true,
//       }
//     }
//   }
  
//   const aemHeadlessClient = new AEMHeadless({
//     serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
//     endpoint: process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT,
//     auth: [process.env.AEM_AUTH_USER, process.env.AEM_AUTH_PASSWORD],
//     fetch: fetch
//   })
  
//   const desktopResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {}, {})
//   const mobileResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/mobile', {}, {})
  
//   return {
//     props: {
//       mobileData: mobileResponse.data.pageByPath.item.panels,
//       desktopData: desktopResponse.data.pageByPath.item.panels,
//       shouldClientsideRender: false,
//     }
//   }
// }

export default function Graphiql(props) {
  const [data, setData] = useState(null)
  const [type, setType] = useState('desktop')
  const [loadRest, setLoadRest] = useState(false)

  const [desktopData, setDesktopData] = useState(null)
  const [mobileData, setMobileData] = useState(null)

  
  useEffect(() => {
    // if (!props.shouldClientsideRender) {return}
    // if (typeof window === 'undefined') {return}
    // const aemHeadlessClient = new AEMHeadless({
    //   serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
    //   endpoint: process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT,
    //   auth: [process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_USER, process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_PASSWORD],
    //   // fetch: fetch
    // })
  
    const getData = async (variation, setState) => {
      const response = await fetch('https://author-p54352-e657273.adobeaemcloud.com/graphql/execute.json/sparkle-demo/homepage%3Bvariation%3D'+variation,
        {credentials: 'include'})
      console.log("\x1b[31m~ response", response)
      const data = await response.json()
      return setState(data.data.pageByPath.item.panels)
      // try {
      //   const response = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: variation}, {})
      //   if (process.env.NEXT_PUBLIC_SAVE_BACKUP_DATA === 'true') {
      //     fetch('http://localhost:3000/api/saveJson', {
      //       method: 'POST',
      //       body: JSON.stringify({
      //         type: variation,
      //         data: response.data
      //       })
      //     })
      //   }
      //   return setState(response.data.pageByPath.item.panels)
      // } catch (error) {
      //   console.error(error)
      //   setState(error)
      // }
    }

    getData('desktop', setDesktopData)
    getData('mobile', setMobileData)

  }, [])
  
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
    if (windowSize.width > 800 || windowSize.width === null) {
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
      {data?.map && data.map((panel, index) => {
        if (type === 'desktop' && index > 0 && !loadRest) {
          document.body.style.overflowY = 'scroll'
          return null
        }
        return <Panel panel={panel} panelNr={index} settings={{type, }} key={index} runOnEnd={index === 0 ? handleEndOfIntroAnimation : null} />;
      })}
    </div>
  )
}