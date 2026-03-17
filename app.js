import express from 'express';
import cors from 'cors';
import connectDB from './DB/db.connect.js';
import cookieParser from 'cookie-parser';


// router
import AuthRouter from './routes/auth.js';
import proUserRouter from './routes/proUser.js'
import DasbordRouter from './routes/dashbord.js'
import AdminRouter from './routes/admin.js'
import adminSportsRouter from './routes/adminSportsRoute.js'



const app=express();


// Database connection
connectDB();

// Middleware
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',  // ✅ Specific origin, not '*'
  credentials: true,                // ✅ Allow credentials
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',AuthRouter)
app.use('/api/proUser',proUserRouter)
app.use('/api/dashbord',DasbordRouter)
app.use('/api/admin',AdminRouter)
app.use('/api/adminPanel',adminSportsRouter)



export default app;
