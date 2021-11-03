# Getting Started

## About The Project

The Project uses API to resize the image as the client wish and stores the resized image in seprate folder.

## Package installation instructions

### in the Terminal

- run `npm install` or `yarn add` in order to install all the dependencies.
- run `npm test` in order to run jasmine testing along with TypeScript, a dist folder will be created.
- run `npm start` in order to run the server at https://localhost:3000 along with TypeScript, a dist folder will be created.

## EndPoint Testing '/api/resizeImage'

- valid requested params should return the path name with success status.
- vaild params with no image found shoud return the path name "Image Couldnot Be Found" with faild status.
- invaild params should return the path name "Your Image Couldn't Process" with Not Found status.

## Starting The Server

- Run `npm start` to run the server.
- Once the server is running, enter https://localhost:3000?filename=(yourfilename)&width(yourwidth)&height(yourheight).
- Please note image should be .png and inside the original folder.
- Example https://localhost:3000?filename=Omar&width=300&height=300 Should generate a resize version of Image "Omar" by 300 x 300.
- resized Images are stored in thumbnail Folder.

## Tools and Dependencies

- express
- jasmine
- sharp
- supertest
- eslint
- prettier
- typescript
- node-cache
