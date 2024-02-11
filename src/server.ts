

import cors from 'cors';
import express, { json } from 'express'
import userRoute from './Routes/userRoute';


const SERVER = express();
const PORT = 4000;

SERVER.use(json())
SERVER.use(cors())


SERVER.use('/user',userRoute)


SERVER.listen(PORT,()=>{
    console.log(`Database connected to: http://localhost${PORT}`);
    
})