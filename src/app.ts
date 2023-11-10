import express, {Request, Response} from "express";
import 'express-async-errors'
import cors from 'cors';
import httpStatus from "http-status";
import indexRoute from "./routes/index-route"


const app = express();
app.use(express.json())
app.use(cors())
app.use(indexRoute)


export default app;