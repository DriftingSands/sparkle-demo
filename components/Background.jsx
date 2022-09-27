/* eslint-disable @next/next/no-img-element */

export default function Background(props) {
  const { backgroundContent, isVideo, altText, color, zIndex } = props.backgroundProps;
  console.log("\x1b[31m~ backgroundContent", backgroundContent)

  // const aspectRatioStyle = {
  //   aspectRatio: `${videoWidth} / ${videoHeight}`
  // }


  return (
    <div className={`backgroundWrapper ${isVideo ? 'isVideo' : ''}`} style={{ backgroundColor: color, zIndex, }}>
      {backgroundContent?.format?.includes('image/') && <img src={backgroundContent._publishUrl} alt={altText} className="backgroundImage" loading={props.lazy ? 'lazy' : 'eager'} />}
      {backgroundContent?.format?.includes('video/') && (
        // <iframe
        //   style={aspectRatioStyle}
        //   className="videoIFrame"
        //   title="Adobe Video Publishing Cloud Player"
        //   src="https://video.tv.adobe.com/v/3409386/?autoplay=true&end=replay"
        //   frameBorder="0"
        //   allow="autoplay"
        //   scrolling="no"
        //   />
        <video 
          className='videoWrapper'
          autoplay='autoplay'
          loop='loop'
          muted='muted'
        >
          <source src={backgroundContent._publishUrl} />
        </video>
      )}
    </div>
  );
}
