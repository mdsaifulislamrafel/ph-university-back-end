/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalError";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
    res.send("Welcome to typescript");
}

app.get("/", test);

// global error handler
app.use(globalErrorHandler as any);

// Not found 
app.use(notFound as any);

export default app;


