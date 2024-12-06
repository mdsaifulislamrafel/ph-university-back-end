import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyControllers } from "./academicFaculty.controller";

const route = Router();

route.post('/create-academic-faculty', validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty);
route.get('/all-academic-faculty', AcademicFacultyControllers.getAcademicFaculty);
route.get('/single-academic-faculty/:id', AcademicFacultyControllers.getSingleAcademicFaculty);
route.patch('/single-academic-faculty-update/:id', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)

export const AcademicFacultyRoutes = route;