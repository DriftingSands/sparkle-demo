const fetchConfig = {
  sparkle: "https://sparkle-data.vercel.app",
  // authorHost: "https://author-p54352-e845472.adobeaemcloud.com",
  // publishHost: "https://publish-p54352-e845472.adobeaemcloud.com",
  fallbackHost: "https://publish-p54352-e854610.adobeaemcloud.com/",
  endpoint: "graphql/execute.json/sample-wknd-app/homepage",
  noAuthorTimestamp: false,
};

const searchParams = new URLSearchParams(window.location.search);

const author = searchParams.get("authorHost");
if (author) {
  const authorUrl = new URL(author);
  fetchConfig.authorHost = `${authorUrl.protocol}//${authorUrl.host}`;
}

const noAuthorTimestampParam = searchParams.get("noAuthorTimestamp");
if (noAuthorTimestampParam?.toLowerCase() === "true") {
  fetchConfig.noAuthorTimestamp = true;
}

const publish = searchParams.get("publishHost");
if (publish) {
  const publishUrl = new URL(publish);
  fetchConfig.publishHost = `${publishUrl.protocol}//${publishUrl.host}`;
}

let endpoint = searchParams.get("endpoint");
if (endpoint) {
  if (endpoint.endsWith("/")) {
    endpoint = endpoint.slice(0, -1);
  }
  fetchConfig.endpoint = endpoint;
}

if (searchParams.get('onlyExternalData')) {
  fetchConfig.noFetch = true
}


export default fetchConfig;
