import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepertmant/academicDepartment.route";

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
  {
    path: '/academic-faculty',
    element: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    element: AcademicDepartmentRoutes,
  }
];

modulesRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
