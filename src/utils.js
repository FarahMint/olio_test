// ------------------------------------
// Display all SMALL images
// ------------------------------------
export const displaySmallImages = item => {
  const {
    images: [
      {
        files: { small }
      }
    ]
  } = item;

  return small;
};
// ------------------------------------
// Display all ORIGINAL images
// ------------------------------------
export const displayOriginalImages = item => {
  const {
    images: [
      {
        files: { original }
      }
    ]
  } = item;

  return original;
};

// "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
// FETCH DATA
export const fetchData = () => {
  let url = `https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
};

// LOAD SCRIPT FOR  MAP
export function loadScript(url) {
  // select the first script tag
  const index = window.document.getElementsByTagName("script")[0];

  // create script tag
  const script = window.document.createElement("script");
  //  access property of tag
  script.src = url;
  script.async = true;
  script.defer = true;

  //  append the child - use insertBefore so we will select the index - the reference \ the 1rst script tag
  // then select its parent node
  // & then insert script before it to keep our script @ the beginning of our list of script

  index.parentNode.insertBefore(script, index);
}

/* <script
  async
  defer
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
/>; */
const API_KEY = `AIzaSyBxgTW-hEQrWjabgvgNEHynxw8mobSzZFQ`;

export const loadMap = () => {
  loadScript(
    `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`
  );
  //Initialize initMap => for JS to render the init map
  //To keep it visible we convert it to the window obj
  window.initMap = this.initMap;
};
