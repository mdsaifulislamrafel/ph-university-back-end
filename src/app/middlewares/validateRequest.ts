import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // console.log(req.body);
        try {
            // validation check
            // if everything all right than call next() and go for -> controller
            await schema.parseAsync({
                body: req.body,
            });
        next()
        } catch (error) {
            next(error)
        }
    }
}

export default validateRequest;