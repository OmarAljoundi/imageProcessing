import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { image_routing } from "./route/index";
export const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  return res.send("Hello World!");
});

image_routing(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
