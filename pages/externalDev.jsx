import { useContext, useEffect, useState } from "react";
import { WindowSizeProvider } from "../components/ResizeProvider";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import desktopData from "../backup/desktop.json";
import mobileData from "../backup/mobile.json";
import Page from "../components/Page";

export default function Graphiql(props) {
  const [data, setData] = useState(null);
  const [viewType, setViewType] = useState("desktop");
  const [loadRest, setLoadRest] = useState(false);
  const [hash, setHash] = useState(null);
  const [ignoreHash, setIgnoreHash] = useState(false);
  const [customHost, setCustomHost] = useState("https://publish-p81252-e700817.adobeaemcloud.com/");
  const [debugAnim, setDebugAnim] = useState(null);
  const [forceView, setForceView] = useState(null)

  const windowSize = useContext(WindowSizeProvider);


  useEffect(() => {
    if (!window.location.search) {
      return;
    }
    const searchParams = new URLSearchParams(window.location.search);

    setDebugAnim(searchParams.get("debugAnim"));
    let hostParam = searchParams.get("authorHost");
    if (!hostParam) {
      hostParam = searchParams.get("publishHost");
    }
    hostParam && setCustomHost(hostParam);
  }, []);

  useEffect(() => {
    if (windowSize.width === null || forceView) {
      return;
    }
    // reset data on resize if passing breakpoint with another viewType set
    if (windowSize.width > 840 && viewType !== "desktop") {
      setData(null);
      setIgnoreHash(false);
    }
    if (windowSize.width <= 840 && viewType !== "mobile") {
      setData(null);
      setIgnoreHash(false);
    }
  }, [windowSize.width]);

  useEffect(() => {
    if (windowSize.height === null) {
      return;
    }
    ScrollTrigger.refresh();
  }, [windowSize.height]);

  useEffect(() => {
    if (data !== null) {
      return;
    }

    // Param must be checked here, otherwise setState updates with data skipping a render
    const forceViewParam = new URLSearchParams(window.location.search).get("forceView")
    if (forceViewParam) {
      setForceView(forceViewParam)
      if (forceViewParam.toLocaleLowerCase() === "desktop") {
        setData(desktopData);
        setViewType("desktop");
      }
      if (forceViewParam.toLocaleLowerCase() === "mobile") {
        setData(mobileData);
        setViewType("mobile");
      }
    } else {
      if (windowSize.width > 840 || windowSize.width === null) {
        setData(desktopData);
        setViewType("desktop");
      } else {
        setData(mobileData);
        setViewType("mobile");
      }
    }
    ScrollTrigger.refresh();
  }, [data, windowSize.width, windowSize.height]);

  // if a hash exists don't wait for first animation to finish
  useEffect(() => {
    if (window.location.hash) {
      setLoadRest(true);
      setHash(window.location.hash);
    }
  }, [viewType]);

  const handleEndOfIntroAnimation = () => {
    setLoadRest(true);
  };

  return !data ? null : (
    <Page
      data={data}
      viewType={viewType}
      host={customHost}
      hash={hash}
      ignoreHash={ignoreHash}
      setIgnoreHash={setIgnoreHash}
      mobileNavObj={data?.mobileNavMenu}
      debugAnim={debugAnim}
      handleEndOfIntroAnimation={handleEndOfIntroAnimation}
      loadRest={loadRest}
    />
  );
}
