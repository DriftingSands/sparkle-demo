import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import ErrorComponent from "../components/ErrorComponent";
import { getData, tryFetch } from "../components/utils";
import Head from "next/head";
import AEMHeadless from '@adobe/aem-headless-client-js';

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
  const [debugAnim, setDebugAnim] = useState(null);

  useEffect(() => {
    const aemHeadlessClient = new AEMHeadless({ serviceUrl: "" });

    const urlParams = new URLSearchParams(window.location.search);
    let authorHost = urlParams.get("authorHost");
    if (!authorHost) authorHost = hostConfig.authorHost;
    if (!authorHost?.endsWith("/")) authorHost = authorHost+'/';

    let publishHost = urlParams.get("publishHost");
    if (!publishHost) publishHost = hostConfig.publishHost;
    if (!publishHost?.endsWith("/")) publishHost = publishHost+'/';

    let endpoint = urlParams.get("endpoint");
    if (!endpoint) endpoint = hostConfig.endpoint;
    if (endpoint?.startsWith("/")) endpoint = endpoint.substring(1);
    
    let debugAnimQuery = urlParams.get("debugAnim");
    if (debugAnimQuery) setDebugAnim(debugAnimQuery);

    const setStates = { setIsAuthorVersion, setFetchError, setCustomHost };
    getData(
      "desktop",
      { setData: setData, ...setStates },
      hostConfig,
      authorHost,
      publishHost,
      endpoint,
      aemHeadlessClient
    );

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
        <title>{data?.title || "Sparkle Demo"}</title>
        <meta name="description" content={data?.description?.plaintext} />
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
