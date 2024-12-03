import { StudentServices } from "./student.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
// import studentValidationSchema from "./student.validation"; : todo

const getStudents = catchAsync(async (req, res) => {
  const students = await StudentServices.getStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student fetched successfully",
    data: students,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const student = await StudentServices.getStudentSingleFromDB(
    req.params.studentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student fetched successfully",
    data: student,
  });
});

const getDeletedStudent = catchAsync(async (req, res) => {
  const student = await StudentServices.getStudentDeleteFromDB(
    req.params.studentId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student Deleted successfully",
    data: student,
  });
});

export const StudentController = {
  getStudents,
  getSingleStudent,
  getDeletedStudent,
};
