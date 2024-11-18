import express from "express";
import { StudentController } from "./student.controlar";

const router = express.Router();


// will coll controller functions
router.post('/create-user', StudentController.createStudent)

router.get('/get-users', StudentController.getStudents)

router.get('/get-single-user/:studentId', StudentController.getSingleStudent)


export const StudentRoutes = router;