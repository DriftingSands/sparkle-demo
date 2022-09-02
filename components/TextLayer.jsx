import Menu from "./Menu";
import PointTextMap from './PointTextMap';

export default function TextLayer(props) {
  return (
    <div className={"textLayer"} id={props?.data?.id}>
      <PointTextMap pointText={props?.data?.pointText} />

      {props.data.type === 'column' && 
        <div className="columnWrapper">
          {props?.data?.column?.map((item, index) => {
            return (
              <item.type
                key={index}
                className={`${item.type} ${item?.styles?.join(' ')}`}
                id={item.id}
                style={{zIndex: item.zIndex}}
                >
                {item.content}
              </item.type>
            )
          })}
        </div>
      }

      {((!props.data.type) || props.data.type === 'row') ? 
      <>
      <div className="left">
        {props?.data?.leftBox?.map((item, index) => {
          return (
            <item.type
            key={index}
            className={`${item.type} ${item?.styles?.join(' ')}`}
            id={item.id}
            style={{zIndex: item.zIndex}}
            >
              {item.content}
            </item.type>
          );
        })}
      </div>

      <div className="right">
        <Menu menuItems={props.menu.menuItems} />
      </div>
      </> : null}
    </div>
  );
}
