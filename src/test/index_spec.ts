import supertest from "supertest";
import { app } from "../server";
const request = supertest(app);

describe("Image Resizeing Test ", () => {
  it("Valid Parameters Should Resize The Image ", async () => {
    const response = await request.get(
      "/api/resizeImage?filename=Omar&width=200&height=200"
    );
    expect(response.body.status).toEqual("Success");
    expect(response.body.FileName).toEqual(
      "thumbnil/Omar-200-200_thumbnail.png"
    );
  });

  it("An Image that is not exist ", async () => {
    const response = await request.get(
      "/api/resizeImage?filename=xxx&width=200&height=200"
    );
    expect(response.body.status).toEqual("Not Found");
  });

  it("Invalid Parameters Should Raise an Error", async () => {
    const response = await request.get(
      "/api/resizeImage?filename=Omar&width=dww&height=200"
    );
    expect(response.body.status).toEqual("Faild");
  });
});
