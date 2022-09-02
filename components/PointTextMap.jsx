import { useEffect } from 'react';

export default function PointTextMap(props) {
  
  // useEffect(() => {
  //   const testImage = document.getElementById('biker')
  //   console.log("\x1b[31m~ testImage", testImage)
  // }, [])
  
  const style = {
    objectFit: props?.pointText?.settings?.fit,
  }
  
  let width;
  let height;
  if (props?.pointText?.settings?.width && props?.pointText?.settings?.height) {
    style.aspectRatio = `${props?.pointText?.settings?.width} / ${props?.pointText?.settings?.height}`
    width = props?.pointText?.settings?.width
    height = props?.pointText?.settings?.height
  }

  return (
    <div className="wrapperForRatio" style={{height,}}>
      <div
        className='pointTextLayer'
        style={{...style, width,}}
      >
        {props?.pointText?.content?.map((item, index) => {
          return (
            <div
              key={index}
              className="pointTextItemWrapper"
              id={item.id}
              style={{
                left: `calc(${item.x} + 50%)`,
                top: `calc(${item.y} + 50%)`,
              }}
            >
              <div className="textWrapper">
                <div className="buyText">
                  <a href={item.link || null}>
                    Buy for {item.price}
                  </a>
                </div>
                <div className="text">
                  {item.text}
                </div>
                <div className="arrow" />
              </div>
              <div className="dot" />
            </div>
          );
        })}
      </div>
    </div>
  )
}