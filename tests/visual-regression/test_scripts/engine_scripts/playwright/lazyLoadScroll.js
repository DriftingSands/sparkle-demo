module.exports = async (page, scenario) => {
  await page.waitForLoadState();

  // this starts the loading of lazy images
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

  // await page.waitForFunction(() => {
  //   return Array.from(document.images).every((i) => {
  //     // console.log(i);
  //     return i.complete;
  //   });
  // });

  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll("img"));
    await Promise.all(selectors.map(img => {
      if (img.complete) return;
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    }));
  })

  // waiting for browser sync notification to go away
  // await page.waitForSelector("#__bs_notify__", { state: "detached" });
};
