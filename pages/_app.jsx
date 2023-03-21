import Head from "next/head";
import "../styles/globals.scss";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import { useCallback, useEffect, useRef } from "react";

function MyApp({ Component, pageProps }) {
  const boundingRectElement = useRef(null);

  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");

  const handleClick = useCallback(event => {
    const nodeList = document.elementsFromPoint(event.x, event.y);

    const topMostEditableElement = nodeList.find(node => node?.dataset?.editablePath || node.attributes.path);
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
          payload: paths.reverse(),
        },
        searchParams.get("iFrameHost")
      );
    }
    return;
  }, []);

  useEffect(() => {
    if (searchParams.get("editMode") === "true") {
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [handleClick]);

  const handleScroll = useCallback(event => {
    if (searchParams.get("editMode") === "true") {
      window.parent.postMessage(
        {
          type: "scrollTop",
          payload: document.documentElement.scrollTop,
        },
        searchParams.get("iFrameHost")
      );
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("editMode") === "true") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const handleResize = useCallback(
    event => {
      if (searchParams.get("editMode") === "true") {
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
      }
    },
    [boundingRectElement]
  );

  useEffect(() => {
    if (searchParams.get("editMode") === "true") {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

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
