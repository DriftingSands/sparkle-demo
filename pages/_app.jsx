import Head from "next/head";
import "../styles/globals.scss";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import { useCallback, useEffect, useRef } from "react";

function MyApp({ Component, pageProps }) {
  const boundingRectElement = useRef(null);

    const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  
  const handleClick = useCallback(event => {
    if (searchParams.get('editMode') === "true") {
      let editable = event.target;
      let paths = [];
      while (editable && !editable?.dataset?.editablePath) {
        editable = editable.parentElement;
      }
      if (editable?.dataset?.editablePath) {
        boundingRectElement.current = editable;
        const boundingBox = editable.getBoundingClientRect();
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
          searchParams.get('iFrameHost')
        );
        paths.push(editable.dataset.editablePath);
      }
      while (editable) {
        editable = editable.parentElement;
        if (editable?.dataset?.editablePath) {
          paths.push(editable.dataset.editablePath);
        }
      }
      if (paths) {
        window.parent.postMessage(
          {
            type: "editablePath",
            payload: paths.reverse(),
          },
          searchParams.get('iFrameHost')
        );
      }
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('editMode') === "true") {
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }
  }, [handleClick]);

  const handleScroll = useCallback(event => {
    if (searchParams.get('editMode') === "true") {
      window.parent.postMessage(
        {
          type: "scrollTop",
          payload: document.documentElement.scrollTop,
        },
        searchParams.get('iFrameHost')
      );
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('editMode') === "true") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const handleResize = useCallback(
    event => {
      if (searchParams.get('editMode') === "true") {
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
              searchParams.get('iFrameHost')
            );
          }
        }
      }
    },
    [boundingRectElement]
  );

  useEffect(() => {
    if (searchParams.get('editMode') === "true") {
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
