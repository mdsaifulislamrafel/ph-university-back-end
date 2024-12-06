import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department created successfully",
    data: result,
  });
});

const getAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentService.getAllAcademicDepartmentsIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Departments fetched successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentIntoDB(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department fetched successfully",
        data: result,
    })
});

const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.updateSingleAcademicDepartmentIntoDB(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Department updated successfully",
        data: result,
    })
});



export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAcademicDepartments,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment,
};