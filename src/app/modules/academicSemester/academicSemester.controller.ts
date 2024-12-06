/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester is created successfully",
    data: result,
  });
});

const getAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester get successfully",
    data: result
  })
});

const singleAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Single Semester get successfully",
    data: result,
  })
})

const updateSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updateData : any = {
    $set: {
      ...data,
    }
  }
  const result = await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(id, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Single Semester Update successfully",
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  singleAcademicSemester,
  updateSingleAcademicSemester
};
