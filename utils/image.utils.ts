export const getImageThumbnail = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${imageId}.webp`;
};

export const getImageScreenshot = (imageId: string) => {
  return `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${imageId}.webp`;
};
