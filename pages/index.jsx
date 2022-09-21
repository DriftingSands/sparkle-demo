import Panel from "../components/Panel";
import desktopData from "../components/_testData";
import mobileData from "../components/_mobileData";
import MobileHeader from "../components/MobileHeader";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useContext, useEffect, useState } from "react";
import {WindowSizeProvider} from "../components/ResizeProvider"

export default function Home() {
  const [data, setData] = useState(null);
  const windowSize = useContext(WindowSizeProvider);



  useEffect(() => {
    if (windowSize.width > 800) {
      setData(null);
      ScrollTrigger.refresh()
      setData(desktopData);
    } else {
      setData(null);
      ScrollTrigger.refresh()
      setData(mobileData);
    }
  }, [windowSize])


  return data ? (
    <div className={"page"} style={{ maxWidth: data?.settings?.maxWidth }}>
      {data?.settings?.type === "mobile" && (
        <MobileHeader maxWidth={data?.settings?.maxWidth} />
      )}
      {data?.panels?.map((panel, index) => {
        return <Panel settings={data.settings} panel={panel} key={index} />;
      })}
    </div>
  ) : null;
}
