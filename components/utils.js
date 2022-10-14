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
  let fetchWasSuccessful = null;

  const arr = [
    {host: authorHost, isAuthor: true},
    {host: publishHost, isAuthor: false},
  ]

  for (let i = 0; i < arr.length; i++) {
    const {host, isAuthor} = arr[i]
    setCustomHost(host)
    fetchWasSuccessful = await tryFetch(AEMHeadless, host, endpoint, variation, setData, isAuthor)
    if (fetchWasSuccessful) {break;}
  }

  // if no fetch was successful, set error state
  if (fetchWasSuccessful === false) {
    setFetchError({ type: "publish", url: hostConfig.publishPath });
  }
  // if the author host was successful change the state to render the page in author view
  if (fetchWasSuccessful === "author") {
    setIsAuthorVersion(true);
  }
};
