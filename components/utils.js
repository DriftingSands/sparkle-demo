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
