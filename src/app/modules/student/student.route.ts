import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();


// will coll controller functions

router.get('/get-users', StudentController.getStudents)

router.get('/get-single-user/:studentId', StudentController.getSingleStudent)

router.patch('/update-user/:studentId', validateRequest(studentValidations.updateStudentValidationSchema), StudentController.getUpdateStudent) 

router.delete('/delete-user/:studentId', StudentController.getDeletedStudent) 


export const StudentRoutes = router;