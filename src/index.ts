import express, { ErrorRequestHandler } from 'express';

import { riskController } from './controllers';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware';
import errorWrapper from './utils/errorWrapper';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/risk', errorWrapper(riskController.getRiskProfile));

app.use(errorHandlingMiddleware as ErrorRequestHandler);

const port = process.env.PORT || 3000;

export const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

export default app;
