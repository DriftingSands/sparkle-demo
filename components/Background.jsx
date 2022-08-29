export default function Background(props) {
  const {path, altText, color} = props.backgroundProps

  return (
    <div className='backgroundWrapper' style={{backgroundColor: color}}>
      {path && <img src={`${path}`} alt={`${altText}`} className="backgroundImage" />}
    </div>
  )
}