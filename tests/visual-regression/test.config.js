
module.exports = {
  id: "test_default",
  viewports: [
    {
      label: "mobile",
      emulateDark: false,
      width: 360,
      height: 640,
    },
    {
      label: "tablet",
      emulateDark: false,
      width: 800,
      height: 1280,
    },
    {
      label: "laptop",
      emulateDark: false,
      width: 1080,
      height: 720,
    },
    {
      label: "desktop",
      emulateDark: false,
      width: 1920,
      height: 1080,
    },
  ],
  onBeforeScript: "playwright/onBefore.js",
  onReadyScript: "playwright/onReady.js",
  scenarioLogsInReports: false,
  misMatchThreshold: 0.0,
  requireSameDimensions: false,
  paths: {
    bitmaps_reference: "test_data/bitmaps_reference",
    bitmaps_test: "test_data/bitmaps_test",
    engine_scripts: "test_scripts/engine_scripts",
    html_report: "test_data/html_report",
    ci_report: "test_data/ci_report",
  },
  report: ["browser"],
  engine: "playwright",
  engineOptions: {
    args: ["--no-sandbox"],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  resembleOutputOptions: {
    errorColor: {
      red: 255,
      green: 0,
      blue: 255,
    },
    errorType: "movement",
    transparency: 0.3,
    ignoreAntialiasing: true,
    usePreciseMatching: true,
  },
  debug: false,
  // Headless / Headed mode, caution: snapshots will be slightly different
  debugWindow: false,
};