import editable from "./Editable";
import Menu from "./Menu";

const textItemLookup = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  a: "a",
  p: "p",
  span: "span",
  button: "button",
};

const isMenu = obj => {
  return obj?._model?.title === "Panel Menu";
};

const TextItem = editable(({ path, index, item, activeMenuItem, editableRef, "data-editable-path": dataEditablePath }) => {
  const MatchingComponent = isMenu(item) ? Menu : textItemLookup[item.type] || "p";
  return (
    <MatchingComponent
      ref={editableRef}
      data-editable-path={dataEditablePath}
      menuItems={item.menuItems}
      activeMenuItem={activeMenuItem}
      key={index}
      className={`${item.type} ${item?.styles?.join(" ")}`}
      id={item.id}
    >
      {item.content?.plaintext}
    </MatchingComponent>
  );
});

function TextLayer({ data, activeMenuItem }) {
  return (
    <div className={"textLayer"} id={data?.id}>
      {data?.column?.length ? (
        <div className={`columnWrapper ${data?.textPosition || ""} ${data?.noPadding ? "noPadding" : ""}`}>
          {data?.column?.map((item, index) => (
            <TextItem
              noScrollTo={true}
              path={item._path}
              key={index}
              index={index}
              item={item}
              activeMenuItem={activeMenuItem}
            />
          ))}
        </div>
      ) : null}

      <div className="left">
        {data?.leftBox?.map((item, index) => (
          <TextItem
            noScrollTo={true}
            path={item._path}
            key={index}
            index={index}
            item={item}
            activeMenuItem={activeMenuItem}
          />
        ))}
      </div>

      <div className="right">
        {data?.rightBox?.map((item, index) => (
          <TextItem
            noScrollTo={true}
            path={item._path}
            key={index}
            index={index}
            item={item}
            activeMenuItem={activeMenuItem}
          />
        ))}
      </div>
    </div>
  );
}

export default TextLayer;
