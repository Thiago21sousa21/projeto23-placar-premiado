import express from "express";
import 'express-async-errors'
import cors from 'cors';
import indexRoute from "./routes/index-route"
import handleErrors from "./middlewares/handle-errors";

const app = express();
app.use(express.json())
app.use(cors())
app.use(indexRoute)
app.use(handleErrors)



export default app;