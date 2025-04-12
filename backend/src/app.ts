import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

//middleware
app.use(cors());
app.use(express.json());


app.use('/', (req, res) => {
    res.json({ app: "salma " });
});

//routes 
app.use('/api/users', userRouter);

//error handling
app.use(errorHandler);

export default app;