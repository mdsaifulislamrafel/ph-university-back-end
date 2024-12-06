import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = Router();

router.post('/create-academic-department', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment);
router.get('/all-academic-departments', AcademicDepartmentController.getAcademicDepartments);
router.get('/single-academic-department/:id',AcademicDepartmentController.getSingleAcademicDepartment);
router.patch('/update-academic-department/:id', validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentController.updateSingleAcademicDepartment);


export const AcademicDepartmentRoutes = router;