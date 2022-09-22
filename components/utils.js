export const scrollToId = (id) => {
  if (!id.startsWith("#")) return;
  const element = document.getElementById(id.substring(1));
  if (!element) {return null}
  window.scrollBy({
    top: element.getBoundingClientRect().top,
    behavior: "smooth",
  });
};
