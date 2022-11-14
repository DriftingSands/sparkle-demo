
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


const fetchConfig = {
  sparkle: "https://sparkle-data.vercel.app",
  // authorHost: "https://author-p54352-e845472.adobeaemcloud.com",
  // publishHost: "https://publish-p54352-e845472.adobeaemcloud.com",
  fallbackHost: "https://publish-p81252-e700817.adobeaemcloud.com",
  endpoint: "graphql/execute.json/sample-wknd-app/homepage",
};

const searchParams = new URLSearchParams(window.location.search);

const author = searchParams.get("authorHost");
if (author) {
  const authorUrl = new URL(author);
  fetchConfig.authorHost = `${authorUrl.protocol}//${authorUrl.host}${authorUrl.port ? ":" + authorUrl.port : ""}`;
}

const publish = searchParams.get("publishHost");
if (publish) {
  const publishUrl = new URL(publish);
  fetchConfig.publishHost = `${publishUrl.protocol}//${publishUrl.host}${
    publishUrl.port ? ":" + publishUrl.port : ""
  }`;
}

let endpoint = searchParams.get("endpoint");
if (endpoint) {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }
  if (endpoint.endsWith("/")) {
    endpoint = endpoint.slice(0, -1);
  }
  fetchConfig.endpoint = endpoint;
}

if (window.innerWidth <= 820) {
  attemptFetch(fetchConfig, "mobile");
  attemptFetch(fetchConfig, 'desktop', null, 5000)
} else {
  attemptFetch(fetchConfig, "desktop");
  attemptFetch(fetchConfig, 'mobile', null, 5000)
}