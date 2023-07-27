export const getRandomImage = (images: string[]): string => {
  return images[Math.floor(Math.random() * images.length)];
};
