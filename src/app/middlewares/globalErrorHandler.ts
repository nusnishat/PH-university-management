import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import { errorHandler } from "../errors/handleZodError";
import handleValidationError from "./handleValidationError";
import handleCastError from "./handleCastError";
import handleDuplicateError from "./handleDuplicateError";
import AppError from "../errors/AppError";


const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction)=>{
    let statusCode = 500;
    let message = "something went wrong";

    let errorSources : TErrorSources = [
      {
        path: "",
        message: "something went wrong"
      }
    ];


    if(error instanceof ZodError)
    {
      const simplifiedError = errorHandler(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    }else if(error?.name === "ValidationError")
    {
      const simplifiedError = handleValidationError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    }else if(error?.name === "CastError")
    {
      const simplifiedError = handleCastError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources; 
    }else if (error?.code === 11000) {
      const simplifiedError = handleDuplicateError(error);
      statusCode = simplifiedError?.statusCode;
      message = simplifiedError?.message;
      errorSources = simplifiedError?.errorSources;
    }else if (error instanceof AppError) {
      statusCode = error?.statusCode;
      message = error?.message;
      errorSources = [{
        path: "",
        message: error?.message
      }];
    }else if (error instanceof Error) {
      message = error?.message;
      errorSources = [{
        path: "",
        message: error?.message
      }];
    };

    return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: error?.stack
    });
  }
  export default globalErrorHandler;