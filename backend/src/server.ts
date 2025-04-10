import app from './app';
import cors from 'cors';
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

async function startServer(){
    try{
        //connect to database
        await prisma.$connect();
        console.log('Connected to database');

        //start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    } catch (error){
        console.log('Failed to connect to the server: ', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer();