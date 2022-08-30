import { useEffect, useRef } from 'react'
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LayerImage({ imageData }) {
  const { layerId, id, path, altText, overflow, basePosition, debug } = imageData

  return (
    <div id={layerId} className={`layerImage ${basePosition} ${debug ? 'debug' : ''} ${overflow ? 'showOverflow' : 'hideOverflow' }`}>
      <img id={id}  className='image' src={`${path}`} alt={`${altText}`} />
    </div>
  )
}