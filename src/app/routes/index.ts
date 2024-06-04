import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { SemesterRoutes } from '../modules/semester/semester.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
    { path: '/users', route: UserRoutes },
    { path: '/students', route: StudentRoutes },
    { path: '/faculties', route: FacultyRoutes },
    { path: '/admins', route: AdminRoutes },
    { path: '/semesters', route: SemesterRoutes },
    { path: '/academic-faculties', route: AcademicFacultyRoutes },
    { path: '/academic-departments', route: AcademicDepartmentRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
