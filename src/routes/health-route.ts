import { Response, Request } from "express";
import { Router } from "express";
import httpStatus from "http-status";

const healthRouter = Router()

healthRouter.get('/',(req: Request,res: Response)=>{
    res.status(httpStatus.OK).send('I am ok')
})

export default healthRouter;