import { useEffect, useState } from "react";

export default function PointTextMap({ data }) {
  const [conformToElement, setConformToElement] = useState(null);



  useEffect(() => {
    const el = document.querySelector(data?.imageSelector);
    if (!el) {return;}
    setConformToElement({ width: el.naturalWidth, height: el.naturalHeight });
  }, [data?.imageSelector]);

  const objectFit = data?.fit;
  const aspectRatio = `${
    conformToElement?.width || data?.width || 16
  } / ${conformToElement?.height || data?.height || 9}`;

  return (
    <div className="wrapperForRatio" id={data.id} style={{ aspectRatio }}>
      <div className="pointTextLayer" style={{ objectFit, aspectRatio }}>
        {data?.content?.map((item, index) => {
          return (
            <div
              key={index}
              className="pointTextItemWrapper"
              id={item.id}
              style={{
                left: `calc(${item.x}% + 50%)`,
                top: `calc(${item.y}% + 50%)`,
              }}
            >
              <div className="textWrapper">
                <div className="buyText">
                  <a href={item.link || null}>Buy for {item.pricetag}</a>
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
