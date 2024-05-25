import express from 'express';
import { SemesterRoutes } from '../modules/semester/semester.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const routes = [
    { path: '/users', route: UserRoutes },
    { path: '/semesters', route: SemesterRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
