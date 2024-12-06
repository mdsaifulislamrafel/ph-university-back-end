/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";
import httpStatus from "http-status";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty created successfully",
      data: result,
    });
  });

const getAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.getAcademicFacultyIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty fetched successfully",
      data: result,
    });
  
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.getSingleAcademicFacultyIntoDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty fetched successfully",
      data: result,
    });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updateData : any = {
      $set: {
       ...data,
      },
    };
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(id, updateData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty updated successfully",
      data: result,
    });
});


export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
  };