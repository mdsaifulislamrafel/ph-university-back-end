/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import studentSchema from "./student.validation";
// import studentValidationSchema from "./student.validation"; : todo
const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: student } = req.body;
    // validate input data for joi
    // const { error, value } = studentValidationSchema.validate(student); : todo: validate
    // validate input data for zod
    const zodValidationSchema = studentSchema.parse(student);
    // if validation fails, return error
    const result = await StudentServices.createStudentIntoDB(zodValidationSchema);

    // if (error) {
    //   return res.status(400).json({
    //     status: "error",
    //     message: "Validation failed",
    //     error: error.details,
    //   });
    // }
    // will coll service function to send this data

    // send response
    
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

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentServices.getStudentFromDB();
    res.status(200).json({
      status: "success",
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching students",
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
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
    res.status(500).json({
      status: "error",
      message: "Error fetching student",
      error: error,
    });
  }
};

const getDeletedStudent = async (req: Request, res: Response) => {
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
    res.status(500).json({
      status: "error",
      message: "Error fetching student",
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getStudents,
  getSingleStudent,
  getDeletedStudent,
};
