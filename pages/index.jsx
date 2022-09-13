import Panel from "../components/Panel";
import desktopData from "../components/_testData";
import mobileData from "../components/_mobileData";
import MobileHeader from "../components/MobileHeader";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  function debounce(func, wait) {
    let timeout;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait);
    };
  }
  

  const handleResize = debounce(() => {
    ScrollTrigger.refresh();
    setData(null);
  }, 100);


  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);


  useEffect(() => {
    if (data === null) {
      if (window.innerWidth > 800) {
        setData(desktopData);
      } else {
        setData(mobileData);
      }
    }
  }, [data]);

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
