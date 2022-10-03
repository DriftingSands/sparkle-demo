import { useEffect, useState } from "react";
// import { AEMHeadless } from '@adobe/aem-headless-client-js'
import Panel from "../components/Panel";
import ErrorComponent from "../components/ErrorComponent";

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
  const [fetchError, setFetchError] = useState(null);

  const authorPath = "https://author-p54352-e657273.adobeaemcloud.com/graphql/execute.json/sparkle-demo/homepage";
  const publishPath = "https://publish-p54352-e657273.adobeaemcloud.com/graphql/execute.json/sparkle-demo/homepage";
  const [customHost, setCustomHost] = useState("");

  const getData = async (variation, setState) => {
    const urlParams = new URLSearchParams(window.location.search);
    let host = urlParams.get("host");
    if (host?.endsWith("/")) {
      host = host.slice(0, -1);
    }
    setCustomHost(host);
    if (customHost) {
      try {
        const response = await fetch(customHost + ";variation=" + variation, { credentials: "include" });
        const data = await response.json();
        return setState(data.data.pageByPath.item.panels);
      } catch (error) {
        return setFetchError({ type: "customHost", customHost, error });
      }
    }
    try {
      const response = await fetch(`${authorPath};variation=${variation}?timestamp=${Date.now()}`, {
        credentials: "include",
      });
      const data = await response.json();
      setIsAuthorVersion(true);
      return setState(data.data.pageByPath.item.panels);
    } catch (error) {
      try {
        const response = await fetch(`${publishPath};variation=${variation}?timestamp=${Date.now()}`);
        const data = await response.json();
        return setState(data.data.pageByPath.item.panels);
      } catch (error) {
        return setFetchError({ type: "publish", publishPath, error });
      }
    }
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

    getData("desktop", setData);
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
              host={customHost || authorPath}
            />
          );
        })}
    </div>
  );
}
