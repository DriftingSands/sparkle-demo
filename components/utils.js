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

export const tryFetch = async (AEMHeadless, host, endpoint, variation, setState, isAuthor) => {
  try {
    AEMHeadless.serviceURL = host

    const response = await AEMHeadless.runPersistedQuery(endpoint, {variation: variation, timestamp: Date.now()}, { credentials: "include" })

    setState(response.data.pageByPath.item);
    return isAuthor ? "author" : true;
  } catch (error) {
    return false;
  }
};

export const getData = async (variation, setStates, hostConfig, authorHost, publishHost, endpoint, AEMHeadless) => {
  const {setData, setIsAuthorVersion, setFetchError, setCustomHost} = setStates
  let successfulFetch = null;
  if (authorHost) {
    setCustomHost(authorHost);
    successfulFetch = await tryFetch(AEMHeadless, authorHost, endpoint, variation, setData, true);
  }
  if (publishHost && !successfulFetch) {
    setCustomHost(publishHost);
    successfulFetch = await tryFetch(AEMHeadless, publishHost, endpoint, variation, setData, false);
  }
  if (successfulFetch === false) setFetchError({ type: "publish", url: hostConfig.publishPath });
  if (successfulFetch === "author") setIsAuthorVersion(true);
};
