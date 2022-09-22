/* eslint-disable @next/next/no-img-element */

import { useContext, useEffect, useRef, useState } from 'react';
import { WindowSizeProvider } from './ResizeProvider';

export default function Background(props) {
  // const windowSize = useContext(WindowSizeProvider);
  const { path, isVideo, videoWidth, videoHeight, altText, color, zIndex } = props.backgroundProps;
  // let path = props?.backgroundProps?.path;
  // let vid = false;

  // const [size, setSize] = useState({width: 16, height: 9})

  // if (path === "/WKND SPA/hybrid/AdobeStock_427738038.jpeg") {
  //   path = "https://video.tv.adobe.com/v/3409386/";
  //   vid = true;
  // }

  // const iFrameRef = useRef(null)

  const aspectRatioStyle = {
    aspectRatio: `${videoWidth} / ${videoHeight}`
  }

  // useEffect(() => {
  //   if (iFrameRef) {
  //     const video = iFrameRef.current?.contentWindow.document.querySelector('.mpc-player__video')
  //     console.log("\x1b[31m~ video", video)
  //   }
  //   setSize(windowSize)
  // }, [windowSize])
  

  return (
    <div className={`backgroundWrapper ${isVideo ? 'isVideo' : ''}`} style={{ backgroundColor: color, zIndex, }}>
      {path && !isVideo && <img src={`${path}`} alt={`${altText}`} className="backgroundImage" loading={props.lazy ? 'lazy' : 'eager'} />}
      {isVideo && (
        <iframe
          style={aspectRatioStyle}
          className="videoIFrame"
          title="Adobe Video Publishing Cloud Player"
          src="https://video.tv.adobe.com/v/3409386/?autoplay=true&end=replay"
          frameBorder="0"
          allow="autoplay"
          scrolling="no"
          // videoResolution={`Medium ${size?.width || 640}x${size?.height || 640}`}
          />
      )}
    </div>
  );
}
