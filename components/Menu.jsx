import { scrollToId } from './utils';

export default function Menu({ menuItems, activeMenuItem }) {

  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {menuItems.map((item, index) => {
          return (
            <a key={index} href={!item.active ? !item.link.startsWith('#') ? item.link : null : null}  onClick={() => {if (item?.link) scrollToId(item.link)}}  >
              <li
                className={`menuListItem ${activeMenuItem === item.menuItemId ? "active" : ""}`}
                id={'menuItem-'+item.menuItemId}
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
