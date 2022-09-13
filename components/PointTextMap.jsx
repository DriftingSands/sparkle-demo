import { useEffect, useState } from "react";

export default function PointTextMap(props) {
  const [conformToElement, setConformToElement] = useState(null);

  useEffect(() => {
    const el = document.querySelector(props?.pointText?.settings?.imgSelector);
    if (!el) {return;}
    setConformToElement({ width: el.naturalWidth, height: el.naturalHeight });
  }, [props?.pointText?.settings?.imgSelector]);

  const objectFit = props?.pointText?.settings?.fit;
  const aspectRatio = `${
    conformToElement?.width || props?.pointText?.settings?.width || 16
  } / ${conformToElement?.height || props?.pointText?.settings?.height || 9}`;

  return (
    <div className="wrapperForRatio" style={{ aspectRatio }}>
      <div className="pointTextLayer" style={{ objectFit, aspectRatio }}>
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
                  <a href={item.link || null}>Buy for {item.price}</a>
                </div>
                <div className="text">{item.text}</div>
                <div className="arrow" />
              </div>
              <div className="dot" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
