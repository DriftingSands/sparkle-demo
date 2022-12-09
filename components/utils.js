export const scrollToId = id => {
  if (!id.startsWith("#")) {
    return;
  }
  const element = document.getElementById(id.substring(1));
  if (!element) {
    return null;
  }
  const boundingBox = element.getBoundingClientRect();
  window.scrollBy({
    top: boundingBox.top,
    behavior: "smooth",
  });
};

