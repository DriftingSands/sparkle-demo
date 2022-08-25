export default function Menu({menuItems}) {

  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {
          menuItems.map((item, index) => {
            return <li key={index} className="menuListItem">
              <a href={`${item.link}`}>{item.text}</a>
            </li>
          })
        }
      </ul>
    </div>
  )
}