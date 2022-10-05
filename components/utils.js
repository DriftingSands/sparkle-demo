export const scrollToId = (id) => {
  if (!id.startsWith("#")) return;
  const element = document.getElementById(id.substring(1));
  if (!element) {
    return null;
  }
  window.scrollBy({
    top: element.getBoundingClientRect().top,
    behavior: "smooth",
  });
};

export const tryFetch = async (host, endpoint, variation, setState, isAuthor) => {
  console.log("\x1b[31m~ host", host)
  try {
    const response = await fetch(
      `${host}${endpoint};variation=${variation}?timestamp=${Date.now()}`,
      isAuthor ? { credentials: "include" } : null
    );
    const data = await response.json();
    setState(data.data.pageByPath.item.panels);
    return isAuthor ? "author" : true;
  } catch (error) {
    return false;
  }
};

export const getData = async (variation, setStates, hostConfig, authorHost, publishHost) => {
  const {setData, setIsAuthorVersion, setFetchError, setCustomHost} = setStates
  let successfulFetch = null;
  if (authorHost) {
    setCustomHost(authorHost);
    successfulFetch = await tryFetch(authorHost, hostConfig.endpoint, variation, setData, true);
  }
  if (publishHost) {
    successfulFetch = await tryFetch(publishHost, hostConfig.endpoint, variation, setData, true);
  }
  if (successfulFetch === false) {
    successfulFetch = await tryFetch(hostConfig.publishHost, hostConfig.endpoint, variation, setData, false);
  }
  if (successfulFetch === false) setFetchError({ type: "publish", url: hostConfig.publishPath });
  if (successfulFetch === "author") setIsAuthorVersion(true);
};
