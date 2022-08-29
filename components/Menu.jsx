export default function Menu({ menuItems }) {
  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {menuItems.map((item, index) => {
          return (
            <a key={index} href={!item.active ? item.link : null}>
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
