const searchParams = new URLSearchParams(window.location.search);

const svg = `<svg viewBox="0 0 36 36" class="spectrum-Icon spectrum-Icon--sizeS_ spectrum-Icon_" focusable="false" aria-hidden="true" role="img"><path fill="rgb(255, 255, 255)" fill-rule="evenodd" d="M29,16H20V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1v9H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1h9v9a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V20h9a1,1,0,0,0,1-1V17A1,1,0,0,0,29,16Z"></path></svg>` // prettier-ignore
const styleForInsertButton = document.createElement("style");
styleForInsertButton.innerHTML = `
.cfEditorEditableContentInsertWrapper {
	position: absolute;
	width: 100%;
	overflow: visible;
	margin-bottom: -3px;
	height: 3px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4096F3;
	transform: translateY(-5px);
	opacity: 0;
	transition: 0.5s opacity ease-in-out;
	flex: 0 0 100%;
}
.cfEditorEditableContentInsertWrapper:hover {
	opacity: 1;
}
.cfEditorEditableContentInsertWrapper > button {
	background-color: #005CC8;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32px !important;
	height: 32px !important;
	border-radius: 50%;
	border: 0;
	cursor: pointer;
}
.cfEditorEditableContentInsertWrapper > button > svg {
	width: 36px !important;
	height: 36px !important;
}
`;
document.head.appendChild(styleForInsertButton);

let topMostEditableElement;

const applyAdaptiveStyling = (wrapperDiv, element, placeAfter = false) => {
  const parentBox = element.parentNode.getBoundingClientRect();
  const elementBox = element.getBoundingClientRect();

  const parentStyle = window.getComputedStyle(element.parentNode);

  if (parentStyle.getPropertyValue("display") === "flex") {
    wrapperDiv.top = 0;
    wrapperDiv.left = 0;

    if (parentStyle.getPropertyValue("flex-direction") === "column") {
      wrapperDiv.style.marginTop = placeAfter
        ? `${elementBox.bottom - parentBox.top + 3}px`
        : `${elementBox.top - parentBox.top - 6}px`;
    } else {
      wrapperDiv.style.width = "3px";
      wrapperDiv.style.height = "100%";
      wrapperDiv.style.marginLeft = placeAfter
        ? `${elementBox.right - parentBox.left + 3}px`
        : `${elementBox.left - parentBox.left - 6}px`;
    }
  }
};

const createInsertButton = (element, placeAfter = false) => {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.className = "cfEditorEditableContentInsertWrapper";
  const addAfterButton = document.createElement("button");

  addAfterButton.onclick = () => {
    if (window.getComputedStyle(wrapperDiv).opacity !== "1") {return} // prettier-ignore
    if (placeAfter) {
      return window.parent.postMessage({type: "editableInsertNew", payload: {path: element.dataset.editablePath, innerCfPath: element.dataset.innerCfPath, lastItem: true}},searchParams.get("iFrameHost")) // prettier-ignore
    }
    window.parent.postMessage({type: "editableInsertNew", payload: {path: element.dataset.editablePath, innerCfPath: element.dataset.innerCfPath}},searchParams.get("iFrameHost")) // prettier-ignore
  };

  addAfterButton.innerHTML = svg;
  wrapperDiv.appendChild(addAfterButton);

  applyAdaptiveStyling(wrapperDiv, element, placeAfter);
  return wrapperDiv;
};

const insertAddAfterButtons = () => {
  const addItemsAfter = document.querySelectorAll("*[data-editable-path][data-cf-add-new='true']");
  if (!addItemsAfter || !addItemsAfter.length) {
    return;
  }

  const addItemsIn = document.querySelectorAll("*:has(*[data-editable-path][data-cf-add-new='true'])");

  addItemsIn.forEach((parentElement) => {
    const editableArrayItems = [
      ...parentElement.querySelectorAll("*[data-editable-path][data-cf-add-new='true']"),
      "lastItem",
    ];

    editableArrayItems.forEach((element, index) => {
      if (element === "lastItem") {
        const prevElement = editableArrayItems[index - 1];
        const lastInsertButton = createInsertButton(prevElement, true);
        prevElement.parentNode.insertBefore(lastInsertButton, prevElement.nextSibling);
        return;
      }

      const insertButton = createInsertButton(element);

      element.parentNode.insertBefore(insertButton, element);
    });
  });
};

const handleClick = (event) => {
  // ignore clicks on add-between buttons
  if (event.target.closest(".cfEditorEditableContentInsertWrapper")) {
    return;
  }
  const nodeList = document.elementsFromPoint(event.x, event.y);

  topMostEditableElement = nodeList.find((node) => node?.dataset?.editablePath || node.attributes.path);
  if (!topMostEditableElement) {
    return;
  }

  const boundingBox = topMostEditableElement.getBoundingClientRect();
  window.parent.postMessage(
    {
      type: "editableBoundingRect",
      payload: [
        boundingBox.top + document.documentElement.scrollTop,
        boundingBox.left,
        boundingBox.height,
        boundingBox.width,
      ],
    },
    searchParams.get("iFrameHost")
  );

  window.parent.postMessage(
    {
      type: "editablePath",
      payload: {
        path: [topMostEditableElement?.dataset?.editablePath],
        innerCfPath: topMostEditableElement?.dataset?.innerCfPath,
      },
    },
    searchParams.get("iFrameHost")
  );
};

const handleResize = () => {
  if (topMostEditableElement) {
    const boundingBox = topMostEditableElement.getBoundingClientRect();
    if (boundingBox) {
      window.parent.postMessage(
        {
          type: "editableBoundingRect",
          payload: [
            boundingBox.top + document.documentElement.scrollTop,
            boundingBox.left,
            boundingBox.height,
            boundingBox.width,
          ],
        },
        searchParams.get("iFrameHost")
      );
    }
  }
};

const handleScroll = () => {
  window.parent.postMessage(
    {
      type: "scrollTop",
      payload: document.documentElement.scrollTop,
    },
    searchParams.get("iFrameHost")
  );
};

const dataHandler = (event) => {
  searchParams.get("logData" === "true") && console.log("new data:", event.data.payload.data);

  if (typeof window.cfEditorDataFunction === "function") {
    return window.cfEditorDataFunction(event);
  }

  // if cfEditorDataFunction is not defined, wait for it to be set before calling it.
  Object.defineProperty(window, "cfEditorDataFunction", {
    set: (value) => {
      Object.defineProperty(window, "cfEditorDataFunction", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: value,
      });
      value(event);
    },
    configurable: true,
  });
  return;
};

const scrollMessageHandler = (event) => {
  const matchingPathElement = document.querySelector(`[data-editable-path='${event.data.path}']`);
  if (!matchingPathElement) {
    return;
  }
  const box = matchingPathElement.getBoundingClientRect();
  if (box.top >= 0 || box.bottom <= window.innerHeight) {
    return;
  }
  window.scrollBy({ top: box.top, left: 0, behavior: "smooth" });
};

const messageHandler = (event) => {
  if (event.data.type === "setCfData") {
    dataHandler(event);
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => insertAddAfterButtons()))
      )
    );
    return;
  }

  if (event.data.type === "scrollToPath" && event.data.path) {
    scrollMessageHandler(event);
    return;
  }
};

const editMode = searchParams.get("editMode");
if (editMode !== "false" && editMode !== "HOC") {
  window.addEventListener("message", messageHandler);
  window.addEventListener("click", handleClick);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
}
