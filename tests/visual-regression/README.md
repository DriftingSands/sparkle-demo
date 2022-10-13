## Visual Regression Testing

Everything you need for visual regression testing is in the `./tests/visual-regression/` folder. We use [BackstopJS](https://github.com/garris/BackstopJS) to take screenshots of the panels created in out app

### Running Tests
To start you will need to install all dependencies
```
npm i
```

To run a test use the following command:
```
npx backstop test --config=local.test.config.js
```

If you want to create/update the reference images with the results of the last test use:
```
npx backstop approve --config=local.test.config.js
```

### Adjusting Tests

Most of what you will want to adjust can be found in `test.config.js` and `local.test.config.js`. In `test.config.js` you will find global [BackstopJS Settings](https://github.com/garris/BackstopJS#using-backstopjs), most scenario-level settings can also be added here, and they will be used for every scenario including viewports.

> A `Scenatio` is the browser instance that is created for the test.

> For help with debugging, you can change the `debugWindow` in `test.config.js` to `true`, this will open the browser as a window so you can see what is going wrong! **Caution! Make sure you have `asyncCaptureLimit` set to `1` so only one browser instance opens at a time.**

`local.test.config.js` has the individual scenario settings and creates them. 

Here you can change base URL & queryparams. Make sure you have the `debugAnim` param set to `instant` to make sure animations happen instantly for the screenshots!

```js
const baseURL = `http://localhost:3000/`;

const queryParams = "?" + new URLSearchParams({
    debugAnim: "instant",
    publishHost: "https://publish-p81252-e700817.adobeaemcloud.com",
    endpoint: "sample-wknd-app/homepage",
  }).toString();
```

To add more pages/paths to run the test on, add them to the `pagesToTest` array 
```js
const pagesToTest = [
  "",
  // 'desktop',
  // 'mobile',
];
```

With the `selectorToCapture` array you can specify what to capture, in our case we capture every panel in the page, as well as the `.pin-spacer-reference`, created to capture the 2nd half of the last panel. 

You can also use `viewport` and `document`. Document will screenshot the entire page, this can be great for reducing the amount of images, but **it is not recommended with advanced animations!**

The `scenario-builder` function will then create a scenario for every page and default viewport. These scenarios, along with any advanced scenarios you created will then be used by BackstopJS to create screenshots and test them.
```js
const selectorsToCapture = [
  "#intro",
  "#intro2",
  "#outdoorPassion",
  "#intoTheNature",
  "#intoTheNature2",
  "#upToTheSky",
  ".pin-spacer-reference"
];
```

> A `.pin-spacer-reference` is created automatically when there are any `.pin-spacers` created by GSAP animations using the [Scrolltrigger Pin feature](https://greensock.com/docs/v3/Plugins/ScrollTrigger), this allows you to easily screenshot the end of a pinned animation!

If you need to create a unique scenario, you can use the `advancedScenarios` array to add them. These are often used for testing click or hover actions. **Remember to have a `postIneractionWait` property that at least as long as any CSS animations that will occur**

```js
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
        label: "mobile",
        width: 540,
        height: 1200,
      },
      {
        label: "ipad-air",
        width: 820,
        height: 1180,
      },
    ],
    clickSelectors: ["#mobile-menu-button"],
  },
];
```

For more information on how BackstopJS configs can be configured check out the [GitHub Page](https://github.com/garris/BackstopJS#using-backstopjs).
