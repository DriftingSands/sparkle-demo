import Menu from "./Menu";
import PointTextMap from './PointTextMap';

export default function TextLayer(props) {
  return (
    <div className={"textLayer"} id={props?.data?.id}>
      <PointTextMap pointText={props?.data?.pointText} />

      <div className="left">
        {props?.data?.leftBox?.map((item, index) => {
          return (
            <item.type
              key={index}
              className={`${item.type} ${item?.styles?.map((style) => ' '+style)}`}
              id={item.id}
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
