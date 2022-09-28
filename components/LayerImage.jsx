/* eslint-disable @next/next/no-img-element */

export default function LayerImage({ data, panelNr }) {
  const { image, altText, layerId, id, overflow, basePosition, debug, fit, forceLoad } = data;

  return (
    <div
      id={layerId}
      className={`layerImage ${fit || 'contain'} ${basePosition || 'center-center'} ${debug ? "debug" : ""} ${
        overflow ? "showOverflow" : "hideOverflow"
      }`}
    >
      <img
        id={id}
        loading={(panelNr === 0 || forceLoad) ? "eager" : "lazy"}
        className="image"
        src={image?._authorUrl}
        alt={altText?.plaintext}
      />
    </div>
  );
}
