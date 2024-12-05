import { Router } from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester);
router.get('/academic-semester-all', AcademicSemesterControllers.getAcademicSemester);
router.get('/academic-semester-single/:id', AcademicSemesterControllers.singleAcademicSemester);
router.patch('/academic-semester-single-update/:id', validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateSingleAcademicSemester)


export const AcademicSemesterRoutes =  router;