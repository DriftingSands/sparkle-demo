import Head from "next/head";
import "../styles/globals.scss";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import { useCallback, useEffect, useRef } from "react";

function MyApp({ Component, pageProps }) {
  const boundingRectElement = useRef(null);

  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");

  const handleClick = useCallback((event) => {
    const nodeList = document.elementsFromPoint(event.x, event.y);

    const topMostEditableElement = nodeList.find((node) => node?.dataset?.editablePath || node.attributes.path);
    if (!topMostEditableElement) {
      return;
    }

    let paths = [];

    boundingRectElement.current = topMostEditableElement;
    const boundingBox = topMostEditableElement.getBoundingClientRect();
    window.parent.postMessage(
      {
        type: "editableBoundingRect",
        payload: [
          boundingBox.top + document.documentElement.scrollTop,
          boundingBox.left,
          boundingBox.height,
          boundingBox.width,
        ],
      },
      searchParams.get("iFrameHost")
    );

    paths.push(topMostEditableElement.dataset.editablePath);

    if (paths) {
      window.parent.postMessage(
        {
          type: "editablePath",
          payload: {
            path: paths.reverse(),
            content: {
              textContent: topMostEditableElement.textContent,
              src: topMostEditableElement?.src || topMostEditableElement.querySelector("img")?.src,
            },
          },
        },
        searchParams.get("iFrameHost")
      );
    }
    return;
  }, []);

  const handleScroll = useCallback((event) => {
    window.parent.postMessage(
      {
        type: "scrollTop",
        payload: document.documentElement.scrollTop,
      },
      searchParams.get("iFrameHost")
    );
  }, []);

  const handleResize = useCallback(
    (event) => {
      if (boundingRectElement.current) {
        const boundingBox = boundingRectElement.current.getBoundingClientRect();
        if (boundingBox) {
          window.parent.postMessage(
            {
              type: "editableBoundingRect",
              payload: [
                boundingBox.top + document.documentElement.scrollTop,
                boundingBox.left,
                boundingBox.height,
                boundingBox.width,
              ],
            },
            searchParams.get("iFrameHost")
          );
        }
        }
    },
    [boundingRectElement]
  );

  useEffect(() => {
    if (searchParams.get("editMode") === "HOC") {
      window.addEventListener("click", handleClick);
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, handleScroll, handleClick]);


  return (
    <>
      <Head>
        <title>Sparkle Demo</title>
      </Head>

      <ResizeProvider>
        <TimelineAnimationWrapper>
          <Component {...pageProps} />
        </TimelineAnimationWrapper>
      </ResizeProvider>
    </>
  );
}

export default MyApp;
