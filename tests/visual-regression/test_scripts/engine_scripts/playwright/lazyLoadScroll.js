module.exports = async (page, scenario) => {
  await page.waitForLoadState();

  // this is needed because images are lazily loaded
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const scrollCheck = setInterval(() => {
        if (
          window.scrollY >=
          Math.floor(document.body.scrollHeight - window.innerHeight - 1)
        ) {
          clearInterval(scrollCheck);
          resolve();
        }
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);
    });
  });

  // await new Promise(resolve => setTimeout(resolve, 999999))
  // await new Promise(resolve => setTimeout(resolve, 2000))

  await page.waitForFunction(() => {
    return Array.from(document.images).every((i) => {
      console.log(i);
      return i.complete;
    });
  });

  // waiting for browser sync notification to go away
  await page.waitForSelector("#__bs_notify__", { state: "detached" });
};
