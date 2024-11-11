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

const PORT = process.env.BACKEND_PORT;
app.listen(5000, '0.0.0.0', () => {
  console.log('Backend server running on port 5000');
});
