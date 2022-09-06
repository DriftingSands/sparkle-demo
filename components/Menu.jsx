export default function Menu({ menuItems }) {

  const scrollToId = (id) => {
    if (!id.startsWith('#')) return
    const element = document.getElementById(id.substring(1))
    window.scrollBy({
      top: element.getBoundingClientRect().top,
      behavior: 'smooth',
    })
  }

  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {menuItems.map((item, index) => {
          return (
            <a key={index} href={!item.active ? !item.link.startsWith('#') ? item.link : null : null}  onClick={() => {if (item?.link) scrollToId(item.link)}}  >
              <li
                className={`menuListItem ${item.active ? "active" : ""}`}
              >
                {item.text}
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
}
