import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/auth.js';
import connectDB from './DB/db.connect.js';
import cookieParser from 'cookie-parser';
const app=express();


// Database connection
connectDB();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',AuthRouter)


export default app;
