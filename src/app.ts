import express, {Request, Response} from "express";
import 'express-async-errors'
import cors from 'cors';
import httpStatus from "http-status";


const app = express();
app.use(express.json())
app.use(cors())

app.get('/health', (req: Request,res: Response)=>{
    res.status(httpStatus.OK).send('I am ok')
})


export default app;