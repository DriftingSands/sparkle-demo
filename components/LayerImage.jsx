import { useEffect, useRef } from 'react'
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LayerImage({ imageData }) {
  const { layerId, id, path, altText, overflow, basePosition, debug, fit, zIndex } = imageData

  return (
    <div id={layerId} style={{zIndex,}} className={`layerImage ${fit} ${basePosition} ${debug ? 'debug' : ''} ${overflow ? 'showOverflow' : 'hideOverflow' }`}>
      <img id={id} style={{zIndex,}} className='image' src={`${path}`} alt={`${altText}`} />
    </div>
  )
}