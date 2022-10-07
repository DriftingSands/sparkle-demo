const config = require("./test.config");

const baseURL = `http://localhost:3000/`;

const queryParams = "?debugAnim=instant";

// add pages you want tested here:
const pagesToTest = [
  "",
  // 'desktop',
  // 'mobile',
  // 'externalDev',
];
const selectorsToCapture = [
  "#intro",
  "#intro2",
  "#outdoorPassion",
  "#intoTheNature",
  "#intoTheNature2",
  "#upToTheSky",
  '#tent-layer'
];

const scenarioBuilder = (config, simpleScenarios, advancedScenarios) => {
  const output = advancedScenarios;

  simpleScenarios.forEach((url) => {
    const name = url || "index";

    output.push({
      label: name,
      url: config.baseURL + url + config.queryParams,
      readySelector: "#upToTheSky",
      selectors: selectorsToCapture,
      hoverSelectors: selectorsToCapture,
    });
  });

  return output;
};

// add advanced tests here:
const advancedScenarios = [
  // possible values
  // {
  //   label: "",
  //   url: ``,
  //   cookiePath: "",
  //   referenceUrl: "",
  //   readyEvent: "",
  //   readySelector: "",
  //   delay: 0,
  //   hideSelectors: [],
  //   removeSelectors: [],
  //   hoverSelector: "",
  //   clickSelector: "",
  //   postInteractionWait: 0,
  //   selectors: [],
  //   selectorExpansion: true,
  //   expect: 0,
  // },
];
const scenarios = scenarioBuilder({ config, baseURL, queryParams }, pagesToTest, advancedScenarios);
module.exports = {
  ...config,
  scenarios,
};
