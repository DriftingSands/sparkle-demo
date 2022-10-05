import { useEffect, useState } from "react";
// import { AEMHeadless } from '@adobe/aem-headless-client-js'
import Panel from "../components/Panel";
import ErrorComponent from "../components/ErrorComponent";
import { tryFetch } from "../components/utils";

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
    loginRedirect: "https://author-p54352-e657273.adobeaemcloud.com",
    authorHost: "https://author-p54352-e657273.adobeaemcloud.com",
    publishHost: "https://publish-p54352-e657273.adobeaemcloud.com",
    endpoint: "/graphql/execute.json/sparkle-demo/homepage",
  };
  const [customHost, setCustomHost] = useState("");

  const getData = async (variation, setState, customUrl) => {
    let successfulFetch = null;
    setCustomHost(customUrl);
    if (customUrl) {
      successfulFetch = await tryFetch(customUrl, hostConfig.endpoint, variation, setState, true);
    } else {
      successfulFetch = await tryFetch(hostConfig.authorHost, hostConfig.endpoint, variation, setState, true);
    }
    if (successfulFetch === false) {
      successfulFetch = await tryFetch(hostConfig.publishHost, hostConfig.endpoint, variation, setState, false);
    }
    if (successfulFetch === false) setFetchError({ type: "publish", url: hostConfig.publishPath });
    if (successfulFetch === "author") setIsAuthorVersion(true);
  };

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
    let host = urlParams.get("host");
    if (host?.endsWith("/")) {
      host = host.slice(0, -1);
    }

    getData("desktop", setData, host);
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
      {data &&
        data.map((panel, index) => {
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
              host={customHost || hostConfig.loginRedirect}
              hash={hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}
