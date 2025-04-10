import express from 'express';
import cors from 'cors';


const app = express();

//middleware
app.use(cors());
app.use(express.json());

// //routes 
// app.use('/api/users', userRouter);

// //error handling
// app.user(errorHandler);


export default app;