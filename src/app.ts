import express, { NextFunction, Request, Response } from 'express';
import "dotenv/config";
import bookRoutes from './app/routes/book.route'
import borrowRoutes from './app/routes/borrow.route'

const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Kitler Library System");
});
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  let errorStatus = 500;
  let errorMessage = "Unknown error has occurred";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errorDetails: any = null;

  console.error(`[ERROR ${errorStatus}]`, errorMessage);

  res.status(errorStatus).json({
    message: errorMessage,
    success: false,
    error: error,
  });
});

export default app;