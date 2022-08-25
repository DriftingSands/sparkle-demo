import Menu from './Menu'

export default function TextLayer(props) {
  const {type, title, button} = props.data
  return (
    <div className={`textLayer ${type}`}>

      <div className="left">
        <h3 className='title'>
          {title}
        </h3>
        <button className={`button size-${button.size} ${button.style}`}>
          {button.text}
        </button>
      </div>

      <div className="right">
        <Menu menuItems={props.menu.menuItems} />
      </div>
    </div>
  )
}