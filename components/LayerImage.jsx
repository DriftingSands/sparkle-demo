/* eslint-disable @next/next/no-img-element */

export default function LayerImage({ data, panelNr, isAuthorVersion }) {
  const { image, altText, layerId, id, overflow, basePosition, debug, fit, forceLoad } = data;

  const source = isAuthorVersion ? image?._authorUrl : image?._publishUrl

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
        src={source}
        alt={altText?.plaintext}
      />
    </div>
  );
}
