import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = Router();

const modulesRoutes = [
  {
    path: "/students",
    element: StudentRoutes,
  },
  {
    path: "/users",
    element: UserRoutes,
  },
  {
    path: "/academic-semesters",
    element: AcademicSemesterRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
