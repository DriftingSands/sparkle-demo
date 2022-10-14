import { useContext, useEffect, useState } from "react";
import { AEMHeadless } from "@adobe/aem-headless-client-js";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import { WindowSizeProvider } from "../components/ResizeProvider";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ErrorComponent from "../components/ErrorComponent";
import { getData } from "../components/utils";
import Head from "next/head";

export default function Graphiql(props) {
  const [data, setData] = useState(null);
  const [type, setType] = useState("desktop");
  const [loadRest, setLoadRest] = useState(false);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hash, setHash] = useState(null);
  const [ignoreHash, setIgnoreHash] = useState(false);

  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);

  const hostConfig = {
    authorHost: "https://author-p81252-e700817.adobeaemcloud.com",
    publishHost: "https://publish-p81252-e700817.adobeaemcloud.com/",
    endpoint: "sample-wknd-app/homepage",
  };
  const [customHost, setCustomHost] = useState("");
  const [debugAnim, setDebugAnim] = useState(null);

  const saveBackupData = (type, data) => {
    if (process.env.NEXT_PUBLIC_SAVE_BACKUP_DATA === "true") {
      fetch("http://localhost:3000/api/saveJson", {
        method: "POST",
        body: JSON.stringify({
          type: type,
          data: data,
        }),
      });
    }
  };

  useEffect(() => {
    // initializing AEM headless here for later
    const aemHeadlessClient = new AEMHeadless({ serviceUrl: "" });

    // get queryparams and replace with default if it's not present
    const urlParams = new URLSearchParams(window.location.search);
    let authorHost = urlParams.get("authorHost");
    if (!authorHost) {
      authorHost = hostConfig.authorHost;
    }
    if (!authorHost?.endsWith("/")) {
      authorHost = authorHost + "/";
    }

    let publishHost = urlParams.get("publishHost");
    if (!publishHost) {
      publishHost = hostConfig.publishHost;
    }
    if (!publishHost?.endsWith("/")) {
      publishHost = publishHost + "/";
    }

    let endpoint = urlParams.get("endpoint");
    if (!endpoint) {
      endpoint = hostConfig.endpoint;
    }
    if (endpoint?.startsWith("/")) {
      endpoint = endpoint.substring(1);
    }

    let debugAnimQuery = urlParams.get("debugAnim");
    if (debugAnimQuery) {
      setDebugAnim(debugAnimQuery);
    }

    const setStates = { setIsAuthorVersion, setFetchError, setCustomHost };
    getData(
      "desktop",
      { setData: setDesktopData, ...setStates },
      hostConfig,
      authorHost,
      publishHost,
      endpoint,
      aemHeadlessClient
    );
    getData(
      "mobile",
      { setData: setMobileData, ...setStates },
      hostConfig,
      authorHost,
      publishHost,
      endpoint,
      aemHeadlessClient
    );
    desktopData && saveBackupData("desktop", desktopData);
    mobileData && saveBackupData("mobile", mobileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset content on width change
  const windowSize = useContext(WindowSizeProvider);
  useEffect(() => {
    if (windowSize.width === null) {
      return;
    }

    setData(null);
  }, [windowSize.width]);

  // refresh scrolltrigger on height change
  useEffect(() => {
    if (windowSize.height === null) {
      return;
    }
    ScrollTrigger.refresh();
  }, [windowSize.height]);

  // setData depending on width
  useEffect(() => {
    if (data !== null) {
      return;
    }
    if (windowSize.width > 840 || windowSize.width === null) {
      setData(desktopData);
      type !== "desktop" && setType("desktop");
    } else {
      setData(mobileData);
      type !== "mobile" && setType("mobile");
    }
    ScrollTrigger.refresh();
  }, [data, desktopData, mobileData, windowSize.width]);

  // if a hash exists don't wait for first animation to finish
  useEffect(() => {
    if (window.location.hash) {
      setLoadRest(true);
      setHash(window.location.hash);
    }
  }, [type]);

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
      {type === "mobile" && (
        <MobileHeader
          isAuthorVersion={isAuthorVersion}
          host={customHost}
          mobileNavObj={data?.mobileNavMenu}
          debugAnim={debugAnim}
        />
      )}
      {data?.panels?.map &&
        data.panels.map((panel, index) => {
          if (type === "desktop" && index > 0 && !loadRest) {
            document.body.style.overflowY = "scroll";
            return null;
          }
          return (
            <Panel
              panel={panel}
              panelNr={index}
              settings={{ type }}
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
