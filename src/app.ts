/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
import { UserRoutes } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlewares/globalError";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to typescript");
});

// global error handler
app.use(globalErrorHandler as any);

// Not found 
app.use(notFound as any);

export default app;
