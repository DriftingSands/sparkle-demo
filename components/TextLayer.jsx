import Menu from "./Menu";
import PointTextMap from './PointTextMap';

export default function TextLayer({data, settings}) {
  return (
    <div className={"textLayer"} id={settings?.id}>
      {data?.pointText && <PointTextMap pointText={data?.pointText} />}

      {data?.column && 
        <div className={`columnWrapper ${settings?.textPosition || ''} ${settings?.noPadding ? 'noPadding' : ''}`}>
          {data?.column?.map((item, index) => {
            return (
              <item.type
                key={index}
                className={`${item.type} ${item?.styles?.join(' ')}`}
                id={item.id}
              >
                {item.content}
              </item.type>
            )
          })}
        </div>
      }

      <div className="left">
        {data?.leftBox?.map((item, index) => {
          return (
            <item.type
            key={index}
            className={`${item.type} ${item?.styles?.join(' ')}`}
            id={item.id}
            >
              {item.content}
            </item.type>
          );
        })}
      </div>

      <div className="right" >
        {data?.rightBox?.map((item, index) => {
          const Component = item.type === 'menu' ? Menu : item.type
          return (
            <Component menuItems={item.menuItems}
              key={index}
              className={`${item.type} ${item?.styles?.join(' ')}`}
              id={item.id}
            >
              {item.content}
            </Component>
          )
        })}
      </div>
    </div>
  );
}
