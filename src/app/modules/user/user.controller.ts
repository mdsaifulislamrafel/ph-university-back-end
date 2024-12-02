import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";
import sendResponse from "../../../utils/sendResponch";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password,  student: studentData } = req.body;

      // const zodValidationSchema = studentSchema.parse(studentData);

      const result = await UserServices.createStudentIntoDB(password, studentData);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully',
        data: result
      })


    } catch (error) {
      next(error)
    }
  };

  export const UserControllers = {
    createStudent
  }