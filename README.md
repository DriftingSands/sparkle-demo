# **Adobe Sparkle**

![first panel](https://github.com/DriftingSands/sparkle-demo/blob/main/README-images/first-panel.jpg?raw=true)

Thank you for your interest in Adobe’s products and services!

## **What is Adobe Sparkle?**

Sparkle is an app, built using AEM content fragments, that allows you to create a website using animated panels as building blocks.

![panel GIF](https://github.com/DriftingSands/sparkle-demo/blob/main/README-images/Amazing-thrills-gif.gif?raw=true)


## **Included in this Demo**
- Things you need to get started
- Quick start guide
- Advanced guide
- Definitions and structure
- Notes

## **What you Need to Get Started**
If you only intend to edit data:
- An AEM instance with Sparkle data.

If you intend to edit the app:
- An AEM instance with Sparkle data.
- Node JS to run the app.
- Familiarity of the Next.js framework.

---
## **Quick Start Guide**


### **Get Set Up**

This demo website is a next js app that will render panels that allow for [animation timelines](https://greensock.com/docs/v3/GSAP/Timeline) powered by [GSAP](https://greensock.com/gsap/).

The app is setup to work entirely on the client-side with the ability to specify your own author publish URLs along with a custom endpoint. Just make sure you're using the correct Content Fragments and graphql call.

In order to start editing the Sparkle content you must [create the sparkle data and graphql endpoints by installing the sparkle reference demo add-on](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/onboarding/demo-add-on/installation.html)

To edit the content navigate to the AEM menu. Under `Assets`, go to `Files`, then navigate to `/sample-wknd-app/en/content-fragments`

Here you can edit the content within the content fragments. The changes can be viewed on https://app.wknd.site/?authorHost=[YOUR HOST HERE].

>Keep in mind you will need to have logged in on another tab first, in order for app to be able to load data from your author host.

If you wish to use your publish host, this will work too, but you must make sure that all the content fragments, and the graphQL endpoint are published. You will need to re-publish every time changes are made to the content fragments!

### **Run App Locally**

First clone the repo.

Then install all dependencies:
```
npm i
```

Afterward you can run the app with:
```
npm run dev
```

The app is now running locally!

### **Adjusting Default Hosts**
By default the app will connect to https://publish-p81252-e700817.adobeaemcloud.com. If you wish to connect to another AEM instance without setting the query parameters, you can change the defaults in `public/initializeQueries.js`

Here you can add default author or publish hosts, or change the fallback.
```js
const fetchConfig = {
  // authorHost: "",
  // publishHost: "",
  fallbackHost: "https://publish-p81252-e700817.adobeaemcloud.com",
  endpoint: "graphql/execute.json/sample-wknd-app/homepage",
};
```
The app will attempt connections to the specified hosts in this order: authorHost → publishHost → fallbackHost

---

## **Structure & Definition**

The basic structure of Content Fragments is:
- Pages
  - Panels
    - Layers
      - Images
      - Text
      - Shoppable moments

We've broken down the structure and included elements below, as well as provided descriptions
for each element.

### ***Pages***

![panel in page](https://github.com/DriftingSands/sparkle-demo/blob/main/README-images/pages-image.jpg?raw=true)

- Pages contain an array of Panels

### ***Panels***

![hiker panel](https://github.com/DriftingSands/sparkle-demo/blob/main/README-images/panels-image.jpg?raw=true)

- Panels contain an array called "layers". Different types of layers are:
  - Image
  - Text
  - Shoppable moments
- Panels can have a background, which can contain an image, video or solid color
- Panels have a dark-mode setting, an ID and an active menu item
  - The active menu item should match the ID of a menu item; this will control which one isn't clickable and is active on the current panel

>IDs are important to add as they are the best way to apply animations to something, additionally they are needed for menu navigation

- Panels have an animation JSON object that contains two properties:
`timelineAnimationSettings` that contains a few options, and `timelineAnimations` , an array that contains slightly altered GSAP animation objects.

### ***Image Layer / Background Layer***

![background](https://github.com/DriftingSands/sparkle-demo/blob/main/README-images/background.jpg?raw=true)

- Image layers contain an image, along with some style options like the anchor point or the fit setting.

```jsonc
"altText": {
  "plaintext": "rocks1"
},
"id": "rocks1", // ID for the <img />
"layerId": "layer-rocks1", // ID for the layer
"basePosition": "bottom-left",
"fit": "contain",
"overflow": false, // allows image to overflow over the panel
"forceLoad": false // won't allow image to be lazy loaded
```

> Using layerID is usually more intuitive for creating animations, because the image layer will have the same dimensions as the panel.

> Any panel images beyond the first on a page are set to lazy load, this can be overwritten

### ***Text Layer***

![text layer](https://github.com/DriftingSands/sparkle-demo/blob/main/README-images/text-layer.jpg?raw=true)

Text layers have two ways to place text:
1. In a column
2. On the left or right side

Menus can also be put inside the L/R content arrays.

Each text layer can have `text items` in all three content arrays at the same time (column, left, right).

```jsonc
// example text item
"type": "h3",
"id": null,
"content": {
  "plaintext": "get in gear"
},
"styles": [
  "yellowBox",
  "uppercase"
]
```

The text layer has a few settings options. `textPosition` and noPadding only applies to the column.

```jsonc
// text layer options
"id": "layer-button",
"textPosition": "bottom-center",
"noPadding": true,
```

---

## **Advanced Guide / Demo**

### **Editing data fetch**

In order to improve performance, the data fetch is preformed in `pages/_document.jsx` as a script, this means the data fetch will be started before Next JS hydration.

`_document.jsx` links to a file: `public/dataFetch.js` this file is responsible for fetching the data, and adding it as a property on the window. `public/initializeQueries.js` is where the query parameters are checked and defaults are stored.

>Screen width is also tested in this process, to load the correct version and only after a duration is the opposite viewports version of the data loaded

### **Editing Animation Timeline**

`/components/TimelineWrapper.jsx` is where GSAP is initialized, and the provider fir the createTimeline function is setup.

If you wish to see how animations are applied or adjust it, everything you need is in `/components/TimelineHelperFunctions.jsx`. An animation timeline is created for every panel, this calls the `createAnimationTimeline` in `TimelineHelperFunctions.jsx`. A timeline is created, and animations are applied and using settings are either played together or one after the other.

Anything using scroll trigger functionality is not placed on the timeline as it should be a standalone animation, which activates according to the scroll position.

>The `createAnimationTimeline` function checks for a query parameter that is mainly used for visual regression. When `?debugAnim=instant` is set, standard animations will end instantly and scroll trigger animations `scrub` property will switch to `true` (they will have no "catch up" time.)

### **Editing Viewport system**

As stated before, which viewport to first render is determined before the first fetch in `/public/dataFetch.js`. Once the page has been fully loaded however, the data will be switched out if the page is resized beyond a specified viewport.

To achieve this `/components/ResizeProvider.jsx` provides a context of the window size. The listener is attached to a debounce function so that there isn't constant updates. The `/components/Page.jsx` uses this resize provider in order to switch the data depending on the viewport.

### **Editing the Page Component**

The page component is setup in a specific way to make everything work properly.

The return statement is pretty standard, rendering an array of Panels. But in order for all the animations and resizing to work correctly the Page component has 5 useEffect functions.

The first and second useEffects are used to create a unique effect and also improve performance. The Page will only render the first Panel unless the `loadRest` state is set to `true`, this will happen either after a timeout or if the user scrolls. The second useEffect also immediately sets `loadRest` to `true` if there is a hash in the url, which will so the page can scroll to the correct panel.

The next two useEffects are for switching the data. The first of the two removes the data when the page is resized beyond a viewport threshold. The second of two activates when there is no data, and sets the correct data type for the viewport. **This must be done in two steps like this** otherwise the animations of the old panels will remain and clash with the new ones. (for example the mobile version will use the desktop animations on some images)

The final useEffect refreshes the scroll trigger GSAP plugin when the height of the page changes, without this triggers for elements that are tied to the viewport break. In the case of sparkle that is most animations as the size of a panel is the same as the viewport. This is especially important for mobile, as most browsers change the view height when scrolling!

### **Editing Other Components**

Every other component in `/components/` are relatively simple Next JS functional components


## **Visual Regression Testing**

The config files for adjusting the visual regression testing is in the `./tests/visual-regression/` folder. We use [BackstopJS](https://github.com/garris/BackstopJS) to take screenshots of the panels created in out app

### **Running Tests**
Make sure all dev dependencies are installed
```
npm i
```

Run the app
```
npm run dev
```

Now that the app is running, open another terminal to run tests in.

We did not include the reference images into this git repository. To create a set of reference images run the following command:
```
npx backstop reference --config=./tests/visual-regression/local.test.config.js
```

To run a test use the following command:
```
npx backstop test --config=./tests/visual-regression/local.test.config.js
```

If you want to update the reference images with the results of the last test use:
```
npx backstop approve --config=./tests/visual-regression/local.test.config.js
```

>Multiple tests scenarios are run asynchronously, depending on the hardware this could cause issues when rendering content during the tests. If that is the case you can adjust the `asyncCaptureLimit` property in `./tests/visual-regression/test.config.js`

### **Adjusting Tests**

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
    endpoint: "graphql/execute.json/sample-wknd-app/homepage",
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

---

## **Notes**

### **Default Connection**

- By default, the demo app will connect to https://publish-p81252-e700817.adobeaemcloud.com.
- If you wish to connect to another AEM instance you can do so by setting the following query parameters:

```
?authorHost=https://author-p81252-e700817.adobeaemcloud.com
&publishHost=https://publish-p81252-e700817.adobeaemcloud.com
&endpoint=graphql/execute.json/sample-wknd-app/homepage
```

> Note that for an author host to work, you must first login to the AEM environment within another tab.

If connecting to the author host and publish host fails, the app will fallback to: https://publish-p81252-e700817.adobeaemcloud.com.

### **Powered by Adobe Stock**

The images in this demo website are from [Adobe Stock](https://stock.adobe.com/) and are Third Party Material as defined in the Demo Asset Additional Terms at [https://www.adobe.com/legal/terms.html](https://www.adobe.com/legal/terms.html).

If you want to use an Adobe Stock image for other purposes beyond viewing this demo website, such as featuring it on a website, or in marketing materials, you can purchase a license on [Adobe Stock](https://stock.adobe.com/).

