import { useContext, useEffect, useState } from "react";
import { WindowSizeProvider } from "../components/ResizeProvider";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ErrorComponent from "../components/ErrorComponent";
import { fetchAndSetData } from "../components/utils";
import Page from '../components/Page';

export default function Graphiql(props) {
  const [data, setData] = useState(null);
  const [type, setType] = useState("desktop");
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [hash, setHash] = useState(null);
  const [loadRest, setLoadRest] = useState(false);
  const [ignoreHash, setIgnoreHash] = useState(false);
  const [forceView, setForceView] = useState(null);

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
    setForceView(new URLSearchParams(window.location.search).get("forceView"));
    const setStates = { setIsAuthorVersion, setFetchError, setCustomHost, setDebugAnim };
    const fetchVariations = [
      {
        variationName: "desktop",
        setData: setDesktopData,
      },
      {
        variationName: "mobile",
        setData: setMobileData,
      },
    ];
    fetchAndSetData(hostConfig, setStates, fetchVariations);

    desktopData && saveBackupData("desktop", desktopData);
    mobileData && saveBackupData("mobile", mobileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset content on width change
  const windowSize = useContext(WindowSizeProvider);
  useEffect(() => {
    if (windowSize.width === null || forceView) {
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
    if (forceView) {
      if (forceView.toLocaleLowerCase() === "desktop") {
        setData(desktopData);
        setType("desktop");
      }
      if (forceView.toLocaleLowerCase() === "mobile") {
        setData(mobileData);
        setType("mobile");
      }
    } else {
      if (windowSize.width > 840 || windowSize.width === null) {
        setData(desktopData);
        type !== "desktop" && setType("desktop");
      } else {
        setData(mobileData);
        type !== "mobile" && setType("mobile");
      }
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
    <Page
      data={data}
      type={type}
      isAuthorVersion={isAuthorVersion}
      host={customHost}
      hash={hash}
      ignoreHash={ignoreHash}
      setIgnoreHash={setIgnoreHash}
      mobileNavObj={data?.mobileNavMenu}
      debugAnim={debugAnim}
      handleEndOfIntroAnimation={handleEndOfIntroAnimation}
      loadRest={loadRest}
    />
  )
}
