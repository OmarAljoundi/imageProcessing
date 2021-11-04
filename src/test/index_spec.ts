import supertest from 'supertest';
import app from '../server';
import Image from '../route/utilities';

const request = supertest(app);

describe('Image Resizeing Test ', () => {
  it('Valid Parameters Should Resize The Image ', async () => {
    const response = await request.get(
      '/api/resizeImage?filename=Omar&width=200&height=200'
    );
    expect(response.status).toEqual(200);
  });

  it('An Image that is not exist ', async () => {
    const response = await request.get(
      '/api/resizeImage?filename=xxx&width=200&height=200'
    );
    expect(response.body.status).toEqual('Not Found');
  });

  it('Invalid Parameters Should Raise an Error', async () => {
    const response = await request.get(
      '/api/resizeImage?filename=Omar&width=-50&height=200'
    );
    expect(response.body.status).toEqual('Faild');
  });
  it('The Resize function should resize the image', async () => {
    const imageName = 'Omar';
    const width = 200;
    const height = 200;
    const imageFile = await Image.resizeImage(imageName, height, width);
    expect(imageFile).toEqual('thumbnail/Omar-200-200_thumbnail.png');
  });
});
