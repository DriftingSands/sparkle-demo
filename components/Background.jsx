/* eslint-disable @next/next/no-img-element */

export default function Background(props) {
  const {path, altText, color, zIndex} = props.backgroundProps

  return (
    <div className='backgroundWrapper' style={{backgroundColor: color, zIndex,}}>
      {path && <img src={`${path}`} alt={`${altText}`} className="backgroundImage" />}
    </div>
  )
}