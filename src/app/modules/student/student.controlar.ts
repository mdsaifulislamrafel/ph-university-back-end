import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.services";
import sendResponse from "../../../utils/sendResponch";
import httpStatus from "http-status";
// import studentValidationSchema from "./student.validation"; : todo

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await StudentServices.getStudentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student fetched successfully',
      data: students
    })
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const student = await StudentServices.getStudentSingleFromDB(
      req.params.studentId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student fetched successfully',
      data: student
    })
  } catch (error) {
    next(error)
  }
};

const getDeletedStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const student = await StudentServices.getStudentDeleteFromDB(
      req.params.studentId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Deleted successfully',
      data: student
    })
  } catch (error) {
    next(error)
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  getDeletedStudent,
};
