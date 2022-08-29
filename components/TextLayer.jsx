import Menu from './Menu'

export default function TextLayer(props) {

  
  return (
    <div className={`textLayer `}>

      <div className="left">
        {props.data.leftBox.map((item, index) => {
          return <item.type key={index} className={`${item.type} ${item.styles.map(style => style)}`}>
            {item.content}
          </item.type>
        })
        }
      </div>

      <div className="right">
        <Menu menuItems={props.menu.menuItems} />
      </div>
    </div>
  )
}