import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.services";
// import studentValidationSchema from "./student.validation"; : todo

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await StudentServices.getStudentFromDB();
    res.status(200).json({
      status: "success",
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const student = await StudentServices.getStudentSingleFromDB(
      req.params.studentId
    );
    res.status(200).json({
      status: "success",
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    next(error)
  }
};

const getDeletedStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const student = await StudentServices.getStudentDeleteFromDB(
      req.params.studentId
    );
    res.status(200).json({
      status: "success",
      message: "Student Deleted successfully",
      data: student,
    });
  } catch (error) {
    next(error)
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  getDeletedStudent,
};
