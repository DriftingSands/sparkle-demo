/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LayerImage({ data, panelNr }) {
  const { path, altText, layerId, id, overflow, basePosition, debug, fit } = data;

  return (
    <div
      id={layerId}
      className={`layerImage ${fit} ${basePosition} ${debug ? "debug" : ""} ${
        overflow ? "showOverflow" : "hideOverflow"
      }`}
    >
      <img id={id} loading={panelNr === 0 ? 'eager' : 'lazy'} className="image" src={`${path}`} alt={altText?.plaintext} />
    </div>
  );
}
