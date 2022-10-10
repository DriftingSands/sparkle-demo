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
  'viewport',
  "#intro",
  "#intro2",
  "#outdoorPassion",
  "#intoTheNature",
  "#intoTheNature2",
  "#upToTheSky",
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
    });
  });

  return output;
};

// add advanced tests here:
const advancedScenarios = [
  {
    label: "mobile-menu",
    url: baseURL + queryParams,
    // wait for this long after clicking menu button
    postInteractionWait: 400,
    readySelector: "#upToTheSky",
    selectors: ['viewport'],
    viewports: [
      {
        label: "phone",
        emulateDark: false,
        width: 320,
        height: 480,
      },
      {
        label: "tablet",
        emulateDark: false,
        width: 800,
        height: 1280,
      },
    ],
    clickSelectors: ["#mobile-menu-button"],
  },
  {
    label: "mobile-nav",
    url: baseURL + queryParams,
    postInteractionWait: 400,
    readySelector: "#upToTheSky",
    selectors: ['viewport'],
    viewports: [
      {
        label: "phone",
        emulateDark: false,
        width: 320,
        height: 480,
      },
      {
        label: "tablet",
        emulateDark: false,
        width: 800,
        height: 1280,
      },
    ],
    clickSelectors: ["#mobile-nav-button"],
  },
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
