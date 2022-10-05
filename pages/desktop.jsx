import { useEffect, useState } from "react";
// import { AEMHeadless } from '@adobe/aem-headless-client-js'
import Panel from "../components/Panel";
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

//   const desktopResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: 'desktop'}, {})

//   return {
//     props: {
//       desktopData: desktopResponse.data.pageByPath.item.panels,
//       shouldClientsideRender: false,
//     }
//   }
// }

export default function Graphiql(props) {
  const [data, setData] = useState(null);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [loadRest, setLoadRest] = useState(false);
  const [hash, setHash] = useState(null);
  const [ignoreHash, setIgnoreHash] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const hostConfig = {
    authorHost: "https://author-p54352-e657273.adobeaemcloud.com",
    publishHost: "https://publish-p54352-e657273.adobeaemcloud.com",
    endpoint: "/graphql/execute.json/sparkle-demo/homepage",
  };
  const [customHost, setCustomHost] = useState("");


  useEffect(() => {
    // if (!props.shouldClientsideRender) {return setData(props.desktopData)}
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
    getData("desktop", {setData: setData, ...setStates}, hostConfig, authorHost, publishHost);
    
    if (window.location.hash) {
      setHash(window.location.hash);
      setLoadRest(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndOfIntroAnimation = () => {
    setLoadRest(true);
  };

  return !data ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <div className={"page"}>
      <Head>
        <title>{data?.title || 'Sparkle Demo'}</title>
        <meta name='description' content={data?.description?.plaintext} />
      </Head>
      {data?.panels?.map &&
        data.panels.map((panel, index) => {
          if (index > 0 && !loadRest) {
            document.body.style.overflowY = "scroll";
            return null;
          }
          return (
            <Panel
              panel={panel}
              panelNr={index}
              settings={{ type: "desktop" }}
              key={index}
              runOnEnd={index === 0 ? handleEndOfIntroAnimation : null}
              isAuthorVersion={isAuthorVersion}
              host={customHost}
              hash={hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}
