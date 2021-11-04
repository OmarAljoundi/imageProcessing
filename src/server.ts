import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import imageRouting from './route/index';

const app: express.Application = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

imageRouting(app);

app.listen(3000, () => {});

export default app;
