import { useEffect, useState } from "react";
import { AEMHeadless } from "@adobe/aem-headless-client-js";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
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
    // if (!props.shouldClientsideRender) {return setData(props.mobileData)}
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

    getData("mobile", setData, host);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !data ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <div className={"page"} style={{ maxWidth: 800, margin: "0 auto" }}>
      <MobileHeader maxWidth={800} isAuthorVersion={isAuthorVersion} host={customHost || hostConfig.loginRedirect} />
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
              host={customHost || hostConfig.loginRedirect}
              hash={window.location.hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}
