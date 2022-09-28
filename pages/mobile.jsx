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
  
//   const mobileResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: 'mobile'}, {})
  
//   return {
//     props: {
//       mobileData: mobileResponse.data.pageByPath.item.panels,
//       shouldClientsideRender: false,
//     }
//   }
// }

export default function Graphiql(props) {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // if (!props.shouldClientsideRender) {return setData(props.mobileData)}
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

    getData('mobile', setData)
  }, [])


  return !data ? null : (
    <div className={"page"} style={{maxWidth: 800, margin: '0 auto'}} >
      <MobileHeader maxWidth={800} />
      {data && data.map((panel, index) => {
        return <Panel panel={panel} panelNr={index} settings={{type: 'mobile', }} key={index} runOnEnd={null} />;
      })}
    </div>
  )
}