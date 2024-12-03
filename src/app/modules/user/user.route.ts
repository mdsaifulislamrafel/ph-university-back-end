import { UserControllers } from "./user.controller";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import express from 'express';

const router = express.Router();



router.post('/create-user', validateRequest(studentValidations.createStudentValidationSchema),  UserControllers.createStudent)

export const UserRoutes = router;