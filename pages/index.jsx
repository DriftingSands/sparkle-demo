import { useContext, useEffect, useState } from "react";
import { AEMHeadless } from "@adobe/aem-headless-client-js";
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import { WindowSizeProvider } from "../components/ResizeProvider";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ErrorComponent from "../components/ErrorComponent";
import { getData } from "../components/utils";
import Head from 'next/head';

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

//   const desktopResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {}, {})
//   const mobileResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/mobile', {}, {})

//   return {
//     props: {
//       mobileData: mobileResponse.data.pageByPath.item.panels,
//       desktopData: desktopResponse.data.pageByPath.item.panels,
//       shouldClientsideRender: false,
//     }
//   }
// }

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
    authorHost: "https://author-p54352-e657273.adobeaemcloud.com",
    publishHost: "https://publish-p54352-e657273.adobeaemcloud.com",
    endpoint: "/graphql/execute.json/sparkle-demo/homepage",
  };
  const [customHost, setCustomHost] = useState("");


  
  
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
    // if (!props.shouldClientsideRender) {return}
    // if (typeof window === 'undefined') {return}
    // const aemHeadlessClient = new AEMHeadless({
      //   serviceURL: process.env.NEXT_PUBLIC_AEM_HOST,
      //   endpoint: process.env.NEXT_PUBLIC_AEM_GRAPHQL_ENDPOINT,
      //   auth: [process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_USER, process.env.NEXT_PUBLIC_CLIENTSIDE_AEM_PASSWORD],
      //   // fetch: fetch
    // })

    const urlParams = new URLSearchParams(window.location.search);
    let authorHost = urlParams.get("authorHost");
    if (authorHost?.endsWith("/")) authorHost = authorHost.slice(0, -1);
    let publishHost = urlParams.get("publishHost");
    if (publishHost?.endsWith("/")) publishHost = publishHost.slice(0, -1);

    if (!authorHost) authorHost = hostConfig.authorHost
    if (!publishHost) publishHost = hostConfig.publishHost
    const setStates = {setIsAuthorVersion, setFetchError, setCustomHost}
    getData("desktop", {setData: setDesktopData, ...setStates}, hostConfig, authorHost, publishHost);
    getData("mobile", {setData: setMobileData, ...setStates}, hostConfig, authorHost, publishHost);
    desktopData && saveBackupData("desktop", desktopData);
    mobileData && saveBackupData("mobile", mobileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const windowSize = useContext(WindowSizeProvider);
  useEffect(() => {
    if (windowSize.width === null) return;

    setData(null);
  }, [windowSize.width]);

  useEffect(() => {
    if (windowSize.height === null) return;
    ScrollTrigger.refresh();
  }, [windowSize.height]);

  useEffect(() => {
    if (data !== null) {
      return;
    }
    if (windowSize.width > 800 || windowSize.width === null) {
      // props.shouldClientsideRender ? (
      setData(desktopData);
      // ) : (
      //   setData(props.desktopData)
      // )
      type !== "desktop" && setType("desktop");
    } else {
      // props.shouldClientsideRender ? (
      setData(mobileData);
      // ) : (
      //   setData(props.mobileData)
      // )
      type !== "mobile" && setType("mobile");
    }
    ScrollTrigger.refresh();
  }, [data, desktopData, mobileData, windowSize.width]);

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
        <title>{data?.title || 'Sparkle Demo'}</title>
        <meta name='description' content={data?.description?.plaintext} />
      </Head>
      {type === "mobile" && (
        <MobileHeader isAuthorVersion={isAuthorVersion} host={customHost} mobileNavObj={data?.mobileNavMenu} />
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
