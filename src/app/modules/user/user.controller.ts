import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password,  student: studentData } = req.body;

      // const zodValidationSchema = studentSchema.parse(studentData);

      const result = await UserServices.createStudentIntoDB(password, studentData);
      res.status(200).json({
        status: "success",
        message: "Student created successfully",
        data: result,
      });
    } catch (error) {
      next(error)
    }
  };

  export const UserControllers = {
    createStudent
  }