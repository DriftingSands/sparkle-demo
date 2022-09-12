import { useEffect, useRef } from 'react'
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LayerImage({ content, settings }) {
  const { path, altText } = content
  const { layerId, id, overflow, basePosition, debug, fit } = settings

  return (
    <div id={layerId} className={`layerImage ${fit} ${basePosition} ${debug ? 'debug' : ''} ${overflow ? 'showOverflow' : 'hideOverflow' }`}>
      <img id={id} className='image' src={`${path}`} alt={`${altText}`} />
    </div>
  )
}