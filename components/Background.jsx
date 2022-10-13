/* eslint-disable @next/next/no-img-element */

export default function Background({ backgroundProps, lazy, host }) {
  const { backgroundContent, isVideo, altText, color, zIndex, type } = backgroundProps;

  const source = host + backgroundContent?._path;

  return (
    <div className={`backgroundWrapper ${isVideo ? "isVideo" : ""}`} style={{ backgroundColor: color, zIndex }}>
      {backgroundContent?.type === "image" && (
        <img src={source} alt={altText} className="backgroundImage" loading={lazy ? "lazy" : "eager"} />
      )}
      {backgroundContent?.format?.includes("video/") && (
        <video className="videoWrapper" autoPlay loop muted>
          <source src={source} />
        </video>
      )}
    </div>
  );
}
