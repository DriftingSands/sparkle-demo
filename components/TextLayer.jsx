import Menu from "./Menu";

export default function TextLayer({data, activeMenuItem}) {
  return (
    <div className={"textLayer"} id={data?.id}>

      {data?.column?.length ? 
        <div className={`columnWrapper ${data?.textPosition || ''} ${data?.noPadding ? 'noPadding' : ''}`}>
          {data?.column?.map((item, index) => {
            return (
              <item.type
                key={index}
                className={`${item.type} ${item?.styles?.join(' ')}`}
                id={item.id}
              >
                {item.content?.plaintext}
              </item.type>
            )
          })}
        </div> : null
      }

      <div className="left">
        {data?.leftBox?.map((item, index) => {
          return (
            <item.type
            key={index}
            className={`${item.type} ${item?.styles?.join(' ')}`}
            id={item.id}
            >
              {item.content?.plaintext}
            </item.type>
          );
        })}
      </div>

      <div className="right" >
        {data?.rightBox?.map((item, index) => {
          const Component = item?._model?.title === 'Panel Menu' ? Menu : item.type
          return (
            <Component menuItems={item.menuItems} activeMenuItem={activeMenuItem}
              key={index}
              className={`${item.type} ${item?.styles?.join(' ')}`}
              id={item.id}
            >
              {item.content?.plaintext}
            </Component>
          )
        })}
      </div>
    </div>
  );
}
