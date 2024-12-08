/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../global.Interface/global.Interface";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values;
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // first error start

  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];
  // first error end

  // teared error start
  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;

    return {
      statusCode,
      message: "validation error",
      errorSources,
    };
  };
  // teared error end

  // secund error start
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
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
