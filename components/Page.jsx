
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import Head from "next/head";

export default function Page({
  data,
  viewType,
  isAuthorVersion,
  host,
  hash,
  ignoreHash,
  setIgnoreHash,
  mobileNavObj,
  debugAnim,
  handleEndOfIntroAnimation,
  loadRest,
  }) {
    
  return (
    <div className={"page"} style={viewType === "mobile" ? { maxWidth: 840, margin: "0 auto" } : null}>
      <Head>
        <title>{data?.title || "Sparkle Demo"}</title>
        <meta name="description" content={data?.description?.plaintext} />
      </Head>
      {viewType === "mobile" && (
        <MobileHeader
          isAuthorVersion={isAuthorVersion}
          host={host}
          mobileNavObj={mobileNavObj}
          debugAnim={debugAnim}
          maxWidth={840}
        />
      )}
      {data?.panels?.map &&
        data.panels.map((panel, index) => {
          if (viewType === "desktop" && index > 0 && !loadRest) {
            document.body.style.overflowY = "scroll";
            return null;
          }
          return (
            <Panel
              panel={panel}
              panelNr={index}
              settings={{ viewType }}
              key={index}
              runOnEnd={index === 0 ? handleEndOfIntroAnimation : null}
              isAuthorVersion={isAuthorVersion}
              host={host}
              hash={hash}
              ignoreHash={ignoreHash}
              setIgnoreHash={setIgnoreHash}
            />
          );
        })}
    </div>
  );
}
