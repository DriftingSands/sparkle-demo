# Adobe Sparkle

Thank you for your interest in Adobe’s products and services! The images in this demo website are from [Adobe Stock](https://stock.adobe.com/) and are Third Party Material as defined in the Demo Asset Additional Terms at [https://www.adobe.com/legal/terms.html](https://www.adobe.com/legal/terms.html).  If you want to use an Adobe Stock image for other purposes beyond viewing this demo website, such as featuring it on a website, or in marketing materials, you can purchase a license on [Adobe Stock](https://stock.adobe.com/).

?authorHost=https://author-p54352-e657273.adobeaemcloud.com&publishHost=https://publish-p54352-e657273.adobeaemcloud.com&endpoint=sparkle-demo/homepage

## Getting Started

This is a next js app that will render panels that allow for [animation timelines](https://greensock.com/docs/v3/GSAP/Timeline) powered by [GSAP](https://greensock.com/gsap/). The app is setup to work entirely on the client-side with the ability to specify your own author publish URLs along with a custom endpoint. As long as you are using the correct Content Fragments and graphql call.

To get started install all dependencies
```
npm i
```

Afterward you can run the app with:
```
npm run dev
```

Without any queryparams our app will default to the following URLs:
```json
"authorHost": "https://author-p81252-e700817.adobeaemcloud.com"
"publishHost": "https://publish-p81252-e700817.adobeaemcloud.com/"
"endpoint": "sample-wknd-app/homepage"
```

To use custom URLs simply set these queryparams with your URL, if there are any missing parameters the default will be used in its place.

example URL: http://localhost:3000/?authorHost=https://author-pYOUR-eHOST.adobeaemcloud.com&publishHost=https://publish-pYOUR-eHOST.adobeaemcloud.com&endpoint=GRAPHQL/ENDPOINT

## Host priority

In order for the **author host** to work, you must login as an author within another tab first, otherwise it will not work.

The app will first try to use the author host, if it could not fetch data from it, it will try using the publish host.

When both hosts fail to work, the app will display an error message. **The data fetch will only work if the dev page is open on the same machine as the dev server!** If you wish to preview the app on another device on the same network, first make sure you have an `.env.local` file with a property `NEXT_PUBLIC_SAVE_BACKUP_DATA=true`, then refresh the root page. A json file will be created with the saved data, and can be accessed under http://localhost:3000/externalDev/ **(for images to load, you need a `publishHost` queryparam!)**

## Visual Regression Testing

The config files for adjusting the visual regression testing is in the `./tests/visual-regression/` folder. We use [BackstopJS](https://github.com/garris/BackstopJS) to take screenshots of the panels created in out app

### Running Tests
Make sure all dev dependencies are installed
```
npm i
```

To run a test use the following command:
```
npx backstop test --config=./tests/visual-regression/local.test.config.js
```

If you want to create/update the reference images with the results of the last test use:
```
npx backstop approve --config=./tests/visual-regression/local.test.config.js
```

### Adjusting Tests

Most of what you will want to adjust can be found in `test.config.js` and `local.test.config.js`. In `test.config.js` you will find global [BackstopJS Settings](https://github.com/garris/BackstopJS#using-backstopjs), most scenario-level settings can also be added here, and they will be used for every scenario including viewports.

> A `Scenario` is the browser instance that is created for the test.

> For help with debugging, you can change the `debugWindow` in `test.config.js` to `true`, this will open the browser as a window so you can see what is going wrong! **Caution! Make sure you have `asyncCaptureLimit` set to `1` so only one browser instance opens at a time.**

`local.test.config.js` has the individual scenario settings and creates them. 

Here you can change base URL & queryparams. Make sure you have the `debugAnim` param set to `instant` to make sure animations happen instantly for the screenshots!

```js
const baseURL = "http://localhost:3000/";

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
  // "desktop",
  // "mobile",
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
    selectors: ["viewport"],
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
