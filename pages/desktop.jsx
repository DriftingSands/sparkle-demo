import { useEffect, useState } from 'react'
import { AEMHeadless } from '@adobe/aem-headless-client-js'
import Panel from '../components/Panel'
import MobileHeader from '../components/MobileHeader'

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
  
//   const desktopResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: 'desktop'}, {})
  
//   return {
//     props: {
//       desktopData: desktopResponse.data.pageByPath.item.panels,
//       shouldClientsideRender: false,
//     }
//   }
// }

export default function Graphiql(props) {
  const [data, setData] = useState(null)
  const [loadRest, setLoadRest] = useState(false)
  
  useEffect(() => {
    // if (!props.shouldClientsideRender) {return setData(props.desktopData)}
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
    // const getData = async (variation, setState) => {
    //   try {
    //     const response = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: variation}, {})
    //     return setState(response.data.pageByPath.item.panels)
    //   } catch (error) {
    //     console.error(error)
    //   }
    }

    getData('desktop', setData)
  }, [])



  const handleEndOfIntroAnimation = () => {
    setLoadRest(true)
  }

  return !data ? null : (
    <div className={"page"} >
      {data && data.map((panel, index) => {
        if (index > 0 && !loadRest) {
          document.body.style.overflowY = 'scroll'
          return null
        }
        return <Panel panel={panel} panelNr={index} settings={{type: 'desktop', }} key={index} runOnEnd={index === 0 ? handleEndOfIntroAnimation : null} />;
      })}
    </div>
  )
}