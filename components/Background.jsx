export default function Background({path, altText}) {
  return (
    <div className='backgroundWrapper'>
      <img src={`${path}`} alt={`${altText}`} className="backgroundImage" />
    </div>
  )
}