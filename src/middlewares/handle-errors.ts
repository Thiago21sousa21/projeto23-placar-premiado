import httpStatus from "http-status"
import errorsList from "../errors/error-list"
import { NextFunction, Request, Response } from "express"
import {PredictedError} from '../protocols/errors-protocols'


const handleErrors = (error: PredictedError , _req: Request, res:Response, _next: NextFunction)=>{

    if(errorsList[error.type]!==undefined)return res.status(error.status).send(error.message)  

    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)

}

export default handleErrors