const searchParams = new URLSearchParams(window.location.search);

let topMostEditableElement;

const handleClick = (event) => {
	const nodeList = document.elementsFromPoint(event.x, event.y);

	topMostEditableElement = nodeList.find(
		(node) => node?.dataset?.editablePath || node.attributes.path
	);
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
				boundingBox.width
			]
		},
		searchParams.get("iFrameHost")
	);

	window.parent.postMessage(
		{
			type: "editablePath",
			payload: {
				path: [topMostEditableElement?.dataset?.editablePath],
				content: {
					textContent: topMostEditableElement.textContent,
					src: topMostEditableElement.src || topMostEditableElement?.querySelector("img")?.src
				}
			}
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
						boundingBox.width
					]
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
			payload: document.documentElement.scrollTop
		},
		searchParams.get("iFrameHost")
	);
};

const dataHandler = (event) => {
	window.cfEditorDataFunction(event.data.payload.data);
};

const scrollMessageHandler = (event) => {
	const matchingPathElement = document.querySelector(`[data-editable-path='${event.data.path}']`);
	console.log("\x1b[31m ~ matchingPathElement:", matchingPathElement)
	if (!matchingPathElement) {return}
	const box = matchingPathElement.getBoundingClientRect();
	if (box.top >= 0 || box.bottom <= window.innerHeight) {
		return;
	}
	window.scrollBy({ top: box.top, left: 0, behavior: "smooth" });
};

const messageHandler = (event) => {
	if (event.data.type === "setCfData") {
		dataHandler(event);
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
