/* eslint-disable @next/next/no-img-element */

export default function LayerImage({ data, panelNr, host }) {
  const { image, altText, layerId, id, overflow, basePosition, debug, fit, forceLoad } = data;

  const source = host + image?._path;

  return (
    <div className={`overflowImageWrapper  ${overflow ? "showOverflow" : "hideOverflow"}`}>
      <div
        id={layerId}
        className={`layerImage ${fit || ""} ${basePosition || "center-center"} ${debug ? "debug" : ""} ${
          overflow ? "showOverflow" : "hideOverflow"
        }`}
      >
        <img
          id={id}
          loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
          className="image"
          width={image?.width}
          height={image?.height}
          src={source}
          alt={altText?.plaintext}
        />
      </div>
    </div>
  );
}
