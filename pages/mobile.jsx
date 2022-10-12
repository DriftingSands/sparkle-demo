import { useEffect, useState } from "react";
import { AEMHeadless } from "@adobe/aem-headless-client-js";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import ErrorComponent from "../components/ErrorComponent";
import { getData, tryFetch } from "../components/utils";
import Head from 'next/head';

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
  const [data, setData] = useState(null);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hash, setHash] = useState(null);
  const [ignoreHash, setIgnoreHash] = useState(false)

  const hostConfig = {
    authorHost: "https://author-p54352-e657273.adobeaemcloud.com",
    publishHost: "https://publish-p54352-e657273.adobeaemcloud.com",
    endpoint: "/graphql/execute.json/sparkle-demo/homepage",
  };
  const [customHost, setCustomHost] = useState("");


  useEffect(() => {
    // if (!props.shouldClientsideRender) {return setData(props.mobileData)}
    // if (typeof window === 'undefined') {return}
    // const aemHeadlessClient = new AEMHeadless({
    //   serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
    //   endpoint: process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT,
    //   auth: [process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_USER, process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_PASSWORD],
    //   // fetch: fetch
    // })
    const urlParams = new URLSearchParams(window.location.search);
    let authorHost = urlParams.get("authorHost");
    if (authorHost?.endsWith("/")) authorHost = authorHost.slice(0, -1);
    let publishHost = urlParams.get("publishHost");
    if (publishHost?.endsWith("/")) publishHost = publishHost.slice(0, -1);

    if (!authorHost && !publishHost) {
      authorHost = hostConfig.authorHost
      publishHost = hostConfig.publishHost
    }
    const setStates = {setIsAuthorVersion, setFetchError, setCustomHost}
    getData("mobile", {setData: setData, ...setStates}, hostConfig, authorHost, publishHost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !data ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <div className={"page"} style={{ maxWidth: 840, margin: "0 auto" }}>
      <Head>
        <title>{data?.title || 'Sparkle Demo'}</title>
        <meta name='description' content={data?.description?.plaintext} />
      </Head>
      <MobileHeader maxWidth={840} isAuthorVersion={isAuthorVersion} host={customHost} mobileNavObj={data?.mobileNavMenu} />
      {data?.panels?.map &&
        data.panels.map((panel, index) => {
          return (
            <Panel
              panel={panel}
              panelNr={index}
              settings={{ type: "mobile" }}
              key={index}
              runOnEnd={null}
              isAuthorVersion={isAuthorVersion}
              host={customHost}
              hash={window.location.hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}
