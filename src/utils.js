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

//
