import { Request, Response } from "express";
import { StudentServices } from "./student.services";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.students;
    // will coll service function to send this data
    const result = await StudentServices.createStudentIntoDB(student);
    // send response
    res.status(200).json({
      status: "success",
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating student",
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

export const StudentController = {
  createStudent,
  getStudents,
  getSingleStudent
};
