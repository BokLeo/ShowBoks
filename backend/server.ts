import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', routes);

app.get('/status', (req: Request, res: Response) => {
  res.send({
    result : true,
    message: 'Server is running'
  });
});

const port = 5000;  // 5000번 포트

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});