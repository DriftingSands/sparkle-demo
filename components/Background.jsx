/* eslint-disable @next/next/no-img-element */

export default function Background(props) {
  const { path, isVideo, videoWidth, videoHeight, altText, color, zIndex } = props.backgroundProps;

  const aspectRatioStyle = {
    aspectRatio: `${videoWidth} / ${videoHeight}`
  }


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
