export const scrollToId = id => {
  if (!id.startsWith("#")) {
    return;
  }
  const element = document.getElementById(id.substring(1));
  if (!element) {
    return null;
  }
  window.scrollBy({
    top: element.getBoundingClientRect().top,
    behavior: "smooth",
  });
};

const tryFetch = async (AEMHeadless, host, endpoint, variation, setState, isAuthor) => {
  try {
    AEMHeadless.serviceURL = host;

    // get data from AEM graphql call at endpoint, causes error if fetch fails
    const response = await AEMHeadless.runPersistedQuery(
      endpoint,
      { variation: variation, timestamp: Date.now() },
      { credentials: "include" }
    );

    setState(response.data.pageByPath.item);
    return isAuthor ? "author" : true;
  } catch (error) {
    // returns false if the fetch fails, will try next host
    return false;
  }
};

export const getData = async (variation, setStates, hostConfig, authorHost, publishHost, endpoint, AEMHeadless) => {
  const { setData, setIsAuthorVersion, setFetchError, setCustomHost } = setStates;
  // tryFetch() will return a truthy value if the fetch is successful
  let successfulFetch = null;
  // try author host if it's present
  if (authorHost) {
    setCustomHost(authorHost);
    // apply fetch result
    successfulFetch = await tryFetch(AEMHeadless, authorHost, endpoint, variation, setData, true);
  }
  // if the author fetch fails and an publish host is present, try publish host
  if (publishHost && !successfulFetch) {
    setCustomHost(publishHost);
    successfulFetch = await tryFetch(AEMHeadless, publishHost, endpoint, variation, setData, false);
  }
  // if no fetch was successful (never returned anything other then false) set error state
  if (successfulFetch === false) {
    setFetchError({ type: "publish", url: hostConfig.publishPath });
  }
  // if the author host was successful change the state to render the page in author view
  if (successfulFetch === "author") {
    setIsAuthorVersion(true);
  }
};
