/* eslint-disable @next/next/no-img-element */

import { useCallback, useMemo } from "react";
import editable from "./Editable";

function LayerImage({ data, panelNr, host, viewType = "desktop", path }) {
  const { image, altText, layerId, id, overflow, basePosition, debug, fit, forceLoad } = data;

  const typeLookup = {
    mobile: "mobile-vertical.webp",
    desktop: "desktop.webp",
  };

  const source = `${host}/${
    image?._path.startsWith("/") ? image._path.substring(1) : image._path
  }/_jcr_content/renditions/${typeLookup[viewType] || "desktop.webp"}`;

  const Image = editable(() =>
    <img
      id={id}
      loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
      className="image"
      width={image?.width}
      height={image?.height}
      src={source}
      alt={altText?.plaintext || "Panel Image"}
      path={path}
    />, path, true)
  ;



  return (
    <div className={`overflowImageWrapper  ${overflow ? "showOverflow" : "hideOverflow"}`}>
      <div
        id={layerId}
        className={`layerImage ${fit || ""} ${basePosition || "center-center"} ${debug ? "debug" : ""} ${
          overflow ? "showOverflow" : "hideOverflow"
        }`}
      >
        {<Image />}
        {/* <EditableImage
          id={id}
          panelNr={panelNr}
          forceLoad={forceLoad}
          image={image}
          source={source}
          altText={altText}
          path={path}
        /> */}
        {/* <img
          id={id}
          loading={panelNr === 0 || forceLoad ? "eager" : "lazy"}
          className="image"
          width={image?.width}
          height={image?.height}
          src={source}
          alt={altText?.plaintext || "Panel Image"}
        /> */}
      </div>
    </div>
  );
}

export default LayerImage;
