/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../global.Interface/global.Interface";
import config from "../config";
import handleZodError from "../errors/HandleZodError";
import handleMongooseValidationError from "../errors/HandleMongooseValidationError";
import handleCastError from "../errors/HandleCastError";
import handleDuplicateError from "../errors/HandleDuplicateError";
import AppError from "../errors/AppErrors";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values;
  let statusCode = 500;
  let message =  "Something went wrong!";

  // first error start

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];
  // first error end

  // secund error start
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleMongooseValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  // secund error end

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
