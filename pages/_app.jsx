import Head from "next/head";
import Script from "next/script";
import "../styles/globals.scss";
import { TimelineAnimationWrapper } from "../components/TimelineWrapper";
import ResizeProvider from "../components/ResizeProvider";
import { useCallback, useEffect, useRef } from 'react';

function MyApp({ Component, pageProps }) {
  const boundingRectElement = useRef(null)

  const handleMessage = useCallback((event) => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      const message = event.data;
      if (message.type === "setCfData" && message.cfType === "marketing-page") {
        setData(message.payload.data);
      }
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [handleMessage]);

  const handleClick = useCallback((event) => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      let editable = event.target;
      let paths = [];
      while (editable && !editable?.dataset?.editablePath) {
        editable = editable.parentElement;
      }
      if (editable?.dataset?.editablePath) {
        boundingRectElement.current = editable;
        const boundingBox = editable.getBoundingClientRect();
        window.parent.postMessage({
          type: "editableBoundingRect",
          payload: [
            boundingBox.top + document.documentElement.scrollTop,
            boundingBox.left,
            boundingBox.height,
            boundingBox.width
          ],
        }, process.env.NEXT_PUBLIC_APP_PREVIEW_IFRAME_HOST);
        paths.push(editable.dataset.editablePath);
      }
      while (editable) {
        editable = editable.parentElement;
        if (editable?.dataset?.editablePath) {
          paths.push(editable.dataset.editablePath);
        }
      }
      if (paths) {
        window.parent.postMessage({
          type: "editablePath",
          payload: paths.reverse(),
        }, process.env.NEXT_PUBLIC_APP_PREVIEW_IFRAME_HOST);
      }
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      window.addEventListener('click', handleClick);
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }
  }, [handleClick]);

  const handleScroll = useCallback((event) => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      window.parent.postMessage({
        type: "scrollTop",
        payload: document.documentElement.scrollTop
      }, process.env.NEXT_PUBLIC_APP_PREVIEW_IFRAME_HOST);
    }
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handleResize = useCallback((event) => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      if (boundingRectElement.current) {
        const boundingBox = boundingRectElement.current.getBoundingClientRect();
        if (boundingBox) {
          window.parent.postMessage({
            type: "editableBoundingRect",
            payload: [
              boundingBox.top + document.documentElement.scrollTop,
              boundingBox.left,
              boundingBox.height,
              boundingBox.width
            ],
          }, process.env.NEXT_PUBLIC_APP_PREVIEW_IFRAME_HOST);
        }
      }
    }
  }, [boundingRectElement]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_PREVIEW === 'true') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
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
