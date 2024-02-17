

import cors from 'cors';
import express, { json } from 'express'
import userRoute from './Routes/userRoute';
import jobRoute from './Routes/jobRoute';
import compnayRoute from './Routes/campanyRoute';
import CategoryRoute from './Routes/CategoryRoute';
import adminRoute from './Routes/adminRoute';
import applicationRoute from './Routes/ApplicationRoute';


const SERVER = express();
const PORT = 4000;

SERVER.use(json())
SERVER.use(cors())


SERVER.use('/user',userRoute);
SERVER.use('/jobs',jobRoute);
SERVER.use('/companies',compnayRoute);
SERVER.use('/category',CategoryRoute);
SERVER.use('/admin',adminRoute);
SERVER.use('/apply',applicationRoute)

SERVER.listen(PORT,()=>{
    console.log(`Database connected to: http://localhost${PORT}`);
    
})