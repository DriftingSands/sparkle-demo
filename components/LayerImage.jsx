import { useEffect, useRef } from 'react'
import { gsap } from "gsap/dist/gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function LayerImage({ imageData }) {
  const { id, path, altText, layerAnimation, imageAnimation, overflow, basePosition, debug } = imageData

  const layerRef = useRef()
  const imageRef = useRef()

  useEffect(() => {

    [
      {ref: layerRef.current, anim: layerAnimation},
      {ref: imageRef.current, anim: imageAnimation}
    ].forEach((item, index) => {
      if (item?.anim?.from && item?.anim?.to) {
        gsap.fromTo(item.ref, {
          ...item.anim.from, 
          immediateRender: false
        },{
          ...item.anim.to,
        })
      } else {
        if (item?.anim?.from) {
          gsap.fromTo(item.ref, {
            ...item.anim.from, 
            immediateRender: false
          })
        }
        if (item?.anim?.to) {
          gsap.to(item.ref, item.anim.to)
        }
      }
    })
  }, [])


  return (
    <div ref={layerRef} id={id} className={`layerImage ${debug ? 'debug' : ''} ${overflow ? 'showOverflow' : 'hideOverflow' }`}>
      <img ref={imageRef} className='image' src={`${path}`} alt={`${altText}`} style={{objectPosition: basePosition,}} />
    </div>
  )
}