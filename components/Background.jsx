/* eslint-disable @next/next/no-img-element */

export default function Background(props) {
  const { altText, color, zIndex } = props.backgroundProps;
  let path = props?.backgroundProps?.path;
  let vid = false;

  if (path === "/WKND SPA/hybrid/AdobeStock_427738038.jpeg") {
    path = "https://video.tv.adobe.com/v/3409386/";
    vid = true;
  }

  return (
    <div className="backgroundWrapper" style={{ backgroundColor: color, zIndex }}>
      {path && !vid && <img src={`${path}`} alt={`${altText}`} className="backgroundImage" />}
      {vid && (
        <iframe
          className="backgroundImage"
          title="Adobe Video Publishing Cloud Player"
          width="640"
          height="640"
          src="https://video.tv.adobe.com/v/3409386/"
          frameBorder="0"
          autoPlay={true}
          scrolling="no"
        ></iframe>
      )}
    </div>
  );
}
