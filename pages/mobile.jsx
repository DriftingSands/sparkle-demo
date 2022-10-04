import { useEffect, useState } from "react";
import { AEMHeadless } from "@adobe/aem-headless-client-js";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
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

  const loginRedirect = "https://author-p54352-e657273.adobeaemcloud.com/";
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
    // if (!props.shouldClientsideRender) {return setData(props.mobileData)}
    // if (typeof window === 'undefined') {return}
    // const aemHeadlessClient = new AEMHeadless({
    //   serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
    //   endpoint: process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT,
    //   auth: [process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_USER, process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_PASSWORD],
    //   // fetch: fetch
    // })

    getData("mobile", setData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !data ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <div className={"page"} style={{ maxWidth: 800, margin: "0 auto" }}>
      <MobileHeader maxWidth={800} isAuthorVersion={isAuthorVersion} host={customHost || loginRedirect} />
      {data &&
        data.map((panel, index) => {
          return (
            <Panel
              panel={panel}
              panelNr={index}
              settings={{ type: "mobile" }}
              key={index}
              runOnEnd={null}
              isAuthorVersion={isAuthorVersion}
              host={customHost || loginRedirect}
              hash={window.location.hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}
