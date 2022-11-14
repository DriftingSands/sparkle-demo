import fetchConfig from './initializeQueries.js';


function fallbackFetch(fetchConfig, variation, resolve) {
  fetch(`${fetchConfig.fallbackHost}/${fetchConfig.endpoint};variation=${variation}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      window.customHost = fetchConfig.fallbackHost;
      resolve(data);
    })
    .catch((error) => {
      console.log('fallback host fetch failed')
      resolve(null)
    })
}


function attemptFetch(fetchConfig, variation, sparkleFetch = false, delay) {
  if (window[variation + "Data"]) {
    return;
  }
  window[variation + "Data"] = new Promise(async (resolve, reject) => {
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, delay))
    }
    if (!fetchConfig.authorHost && !fetchConfig.publishHost) {
      console.log('no author or publish host specified')
      return fallbackFetch(fetchConfig, variation, resolve)
    }
    fetch(
      `${fetchConfig.authorUrl}/${fetchConfig.endpoint}${
        sparkleFetch ? `/${variation}.json` : `;variation=${variation}`
      }`,
      !sparkleFetch ? { credentials: "include" } : null
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        window.customHost = fetchConfig.authorUrl;
        window.isAuthorHost = true;
        resolve(data);
      })
      .catch(error => {
        console.log("Author fetch failed, attempting published version");
        fetch(`${fetchConfig.publishUrl}/${fetchConfig.endpoint};variation=${variation}`)
          .then(response => response.json())
          .then(data => {
            window.customHost = fetchConfig.authorUrl;
            resolve(data);
          })
          .catch(error => {
            console.log("Publish url also failed.");
            fallbackFetch(fetchConfig, variation, resolve)
          });
      });
  });
}


if (window.innerWidth <= 820) {
  attemptFetch(fetchConfig, "mobile");
  attemptFetch(fetchConfig, 'desktop', null, 5000)
} else {
  attemptFetch(fetchConfig, "desktop");
  attemptFetch(fetchConfig, 'mobile', null, 5000)
}

let preFetchUrl = fetchConfig.fallbackHost

if (fetchConfig.publishHost) {
  preFetchUrl = fetchConfig.publishHost
}
if (fetchConfig.authorHost) {
  preFetchUrl = fetchConfig.authorHost
}

const preconnectLink = document.createElement('link')

preconnectLink.rel = 'preconnect'
preconnectLink.crossorigin = ''
preconnectLink.href = preFetchUrl

document.head.appendChild(preconnectLink)

const preconnectBiker = document.createElement('link')

preconnectBiker.rel = 'preload'
preconnectBiker.fetchpriority = 'high'
preconnectBiker.as = 'image'
preconnectBiker.id = 'preload-biker'
preconnectBiker.type = 'image/webp'
preconnectBiker.href = `${preFetchUrl}/content/dam/sample-wknd-app/en/image-files/biker${ window.innerWidth <= 820 ? '_m' : ''}.png/_jcr_content/renditions/${window.innerWidth <= 820 ? 'mobile-vertical' : 'desktop'}.webp`

document.head.appendChild(preconnectBiker)

{/* <link
  fetchpriority="high"
  rel="preload"
  href={`${preFetchUrl}/content/dam/sample-wknd-app/en/image-files/biker${ window.innerWidth <= 820 ? '_m' : ''}.png/_jcr_content/renditions/mobile-vertical.webp`}
  id="preload-biker"
  as="image"
  type="image/webp"
/>
<link rel="preconnect" href={preFetchUrl} crossorigin /> */}