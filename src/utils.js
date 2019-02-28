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

// FETCH DATA
export const fetchData = () => {
  let url = `https://s3-eu-west-1.amazonaws.com/olio-staging-images/developer/test-articles.json`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      this.setState(error);
    });
};
