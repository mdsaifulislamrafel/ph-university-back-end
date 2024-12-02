
import { Request, Response } from "express";
import { StudentServices } from "./student.services";
// import studentValidationSchema from "./student.validation"; : todo


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
  getStudents,
  getSingleStudent,
  getDeletedStudent,
};
