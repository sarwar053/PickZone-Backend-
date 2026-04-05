import express from 'express';
import cors from 'cors';
import connectDB from './DB/db.connect.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




// router
import AuthRouter from './routes/auth.js';
import proUserRouter from './routes/proUser.js'
import DasbordRouter from './routes/dashbord.js'
import AdminRouter from './routes/admin.js'
import adminSportsRouter from './routes/adminSportsRoute.js'
import priceRouter from './routes/Price.js'
import pickResultRouter from './routes/pickResult.js'
import userRoutes from "./routes/userRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();


// Database connection
connectDB();

// Middleware
app.use(cookieParser());

app.use(cors({
  httpOnly: true,
  secure: false,   
  origin: 'http://localhost:5173',  // ✅ Specific origin, not '*'
  credentials: true,   
  sameSite:"lax" ,
  maxAge: 7 * 24 * 60 * 60 * 1000,            // ✅ Allow credentials
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',AuthRouter)
app.use('/api/proUser',proUserRouter)
app.use('/api/dashbord',DasbordRouter)
app.use('/api/admin',AdminRouter)
app.use('/api/adminPanel',adminSportsRouter)
app.use('/api/adminPanel/price',priceRouter)
app.use('/api/adminPanel/pickResult',pickResultRouter)

// files
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use("/api/users/", userRoutes);

export default app;
