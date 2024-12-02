import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/User/User.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";

const router = Router();

router.use('/students', StudentRoutes);
router.use('/users', UserRoutes);
router.use('/academic-semester', AcademicSemesterRoutes);

export default router;