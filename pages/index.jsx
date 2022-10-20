import { useEffect, useState } from "react";
import ErrorComponent from "../components/ErrorComponent";
import { fetchAndSetData } from "../components/utils";
import Page from "../components/Page";

export default function Graphiql(props) {
  const [desktopData, setDesktopData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const [isAuthorVersion, setIsAuthorVersion] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [customHost, setCustomHost] = useState("");

  const hostConfig = {
    authorHost: "https://author-p81252-e700817.adobeaemcloud.com",
    publishHost: "https://publish-p81252-e700817.adobeaemcloud.com/",
    endpoint: "sample-wknd-app/homepage",
  };

  const saveBackupData = (viewType, data) => {
    if (process.env.NEXT_PUBLIC_SAVE_BACKUP_DATA === "true") {
      fetch("http://localhost:3000/api/saveJson", {
        method: "POST",
        body: JSON.stringify({
          type: viewType,
          data: data,
        }),
      });
    }
  };

  useEffect(() => {
    const setStates = { setIsAuthorVersion, setFetchError, setCustomHost };
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

  return !desktopData && !mobileData ? (
    fetchError ? (
      <ErrorComponent type={fetchError.type} url={fetchError.host} error={fetchError.error} />
    ) : null
  ) : (
    <Page desktopData={desktopData} mobileData={mobileData} isAuthorVersion={isAuthorVersion} host={customHost} />
  );
}
