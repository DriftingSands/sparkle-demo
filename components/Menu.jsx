import { scrollToId } from "./utils";

export default function Menu({ menuItems, activeMenuItem }) {
  const onClickHandler = link => {
    if (link) {
      scrollToId(link);
    }
    // add hash to url without refreshing page
    window.history.replaceState(window.location.href.split("#")[0], null, link);
    window.postMessage({type: 'hashUpdate', hash: link}, window.location.origin)
  };

  return (
    <div className="menuWrapper">
      <ul className="menuList">
        {menuItems.map((item, index) => {
          return (
            <a
              key={index}
              href={!item.active ? (!item?.link?.startsWith("#") ? item.link : null) : null}
              onClick={() => onClickHandler(item?.link)}
            >
              <li
                className={`menuListItem ${activeMenuItem === item.menuItemId ? "active" : ""}`}
                id={"menuItem-" + item.menuItemId}
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
