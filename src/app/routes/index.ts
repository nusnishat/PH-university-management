import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/User/User.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";

const router = Router();

router.use('/students', StudentRoutes);
router.use('/users', UserRoutes);
router.use('/academic-semester', AcademicSemesterRoutes);
router.use('/academic-faculty', AcademicFacultyRoutes);
router.use('/academic-department', AcademicDepartmentRoutes);

export default router;