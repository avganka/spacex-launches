import {getRandomImage} from './getRandomImage';

describe('getRandomImage', () => {
  it('should return a string from the array', () => {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const result = getRandomImage(images);

    expect(images).toContain(result);
  });

  it('should return undefined for an empty array', () => {
    const images: string[] = [];
    const result = getRandomImage(images);

    expect(result).toBeUndefined();
  });

  it('should return the same string when array contains only one image', () => {
    const images = ['image1.jpg'];
    const result = getRandomImage(images);

    expect(result).toEqual('image1.jpg');
  });
});
