import Menu from "./Menu";

export default function TextLayer(props) {
  return (
    <div className={"textLayer"} id={props?.data?.id}>
      {props?.data?.pointText?.map((item, index) => {
        return (
          <div
            key={index}
            className="pointTextItemWrapper"
            id={item.id}
            style={{
              left: `${item.x + 50}%`,
              top: `${item.y + 50}%`,
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

      <div className="left">
        {props?.data?.leftBox?.map((item, index) => {
          return (
            <item.type
              key={index}
              className={`${item.type} ${item.styles.map((style) => style)}`}
            >
              {item.content}
            </item.type>
          );
        })}
      </div>

      <div className="right">
        <Menu menuItems={props.menu.menuItems} />
      </div>
    </div>
  );
}
