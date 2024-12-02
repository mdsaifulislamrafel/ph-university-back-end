import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudent = async (req: Request, res: Response) => {
    try {
      const { password,  student: studentData } = req.body;

      // const zodValidationSchema = studentSchema.parse(studentData);

      const result = await UserServices.createStudentIntoDB(password, studentData);
      res.status(200).json({
        status: "success",
        message: "Student created successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message || "Error creating student",
        error: error,
      });
    }
  };

  export const UserControllers = {
    createStudent
  }