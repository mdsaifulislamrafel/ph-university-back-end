/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from "../global.Interface/global.Interface";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMassage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: extractedMassage,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleDuplicateError;
