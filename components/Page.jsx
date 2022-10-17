
import Panel from "../components/Panel";
import MobileHeader from "../components/MobileHeader";
import Head from "next/head";

export default function Page({
  data,
  type,
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
    <div className={"page"} style={type === "mobile" ? { maxWidth: 840, margin: "0 auto" } : null}>
      <Head>
        <title>{data?.title || "Sparkle Demo"}</title>
        <meta name="description" content={data?.description?.plaintext} />
      </Head>
      {type === "mobile" && (
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
