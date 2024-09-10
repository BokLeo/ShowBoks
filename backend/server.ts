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
  res.send('Server is running');
});

const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.error(`Server is running on port ${PORT}`);
});

