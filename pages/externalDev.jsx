import { useContext, useEffect, useState } from "react";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import { WindowSizeProvider } from "../components/ResizeProvider";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import desktopData from "../backup/desktop.json";
import mobileData from "../backup/mobile.json";
import Head from "next/head";
import Page from '../components/Page';

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
      return
    }
    const searchParams = new URLSearchParams(window.location.search)

    setDebugAnim(searchParams.get('debugAnim'))
    setForceView(searchParams.get('forceView'))
  }, [])

  useEffect(() => {
    if (windowSize.width === null ||forceView) {
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
    if (forceView) {
      if (forceView.toLocaleLowerCase() === "desktop") {
        setData(desktopData);
        setViewType("desktop");
      }
      if (forceView.toLocaleLowerCase() === "mobile") {
        setData(mobileData);
        setViewType("mobile");
      }
    } else {
      if ((windowSize.width > 840) || windowSize.width === null) {
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
