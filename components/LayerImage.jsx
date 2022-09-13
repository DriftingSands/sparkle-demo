/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LayerImage({ data, settings }) {
  const { path, altText } = data;
  const { layerId, id, overflow, basePosition, debug, fit } = settings;

  return (
    <div
      id={layerId}
      className={`layerImage ${fit} ${basePosition} ${debug ? "debug" : ""} ${
        overflow ? "showOverflow" : "hideOverflow"
      }`}
    >
      <img id={id} className="image" src={`${path}`} alt={`${altText}`} />
    </div>
  );
}
