import { useEffect, useState } from "react";
import ErrorComponent from "../components/ErrorComponent";
// import { fetchAndSetData } from "../components/utils";
import Page from "../components/Page";

export default function Graphiql(props) {
  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [customHost, setCustomHost] = useState("");

  // const hostConfig = {
  //   // authorHost: "https://author-p54352-e845472.adobeaemcloud.com",
  //   // publishHost: "https://publish-p54352-e845472.adobeaemcloud.com",
  //   fallbackHost: "https://publish-p81252-e700817.adobeaemcloud.com",
  //   endpoint: "sample-wknd-app/homepage",
  // };

  useEffect(() => {
    // const setStates = { setIsAuthorVersion, setFetchError, setCustomHost };
    // const fetchVariations = [
    //   {
    //     variationName: "desktop",
    //     setData: setDesktopData,
    //   },
    //   {
    //     variationName: "mobile",
    //     setData: setMobileData,
    //   },
    // ];
    // fetchAndSetData(hostConfig, setStates, fetchVariations);
    window.mobileData && window.mobileData.then((data) => {
      if (!data) {
        setFetchError({type: 'publish', host: window.customHost})
        return
      }
      setMobileData(data.data.pageByPath.item);
      setCustomHost(window.customHost);
      setIsAuthorVersion(window.isAuthorHost)
    })
    window.desktopData && window.desktopData.then((data) => {
      if (!data) {
        setFetchError({type: 'publish', host: window.customHost})
        return
      }
      setDesktopData(data.data.pageByPath.item);
      setCustomHost(window.customHost);
      setIsAuthorVersion(window.isAuthorHost)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !desktopData && !mobileData ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
  );
}
