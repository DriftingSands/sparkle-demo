module.exports = async (
  page,
  scenario,
  viewport,
  isReference,
  browserContext
) => {
  console.log("\x1b[32mSCENARIO > " + scenario.label, '\x1b[37m');

  // add more ready handlers here...
  await require("./lazyLoadScroll")(page, scenario);
  await require("./clickAndHoverHelper")(page, scenario);
  
  // if (!!viewport.emulateDark) {
  //   await page.emulateMedia({colorScheme: 'dark'});
  // }
};
