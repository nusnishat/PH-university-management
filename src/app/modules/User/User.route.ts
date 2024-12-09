import express from 'express';
import { UserControllers } from './User.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createAcademicFacultyValidationSchema } from '../academicFaculty/academicFaculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
const router = express.Router();

router.post('/create-student', validateRequest(createStudentValidationSchema) , UserControllers.createStudent);
router.post(
    '/create-faculty',
    validateRequest(createAcademicFacultyValidationSchema),
    UserControllers.createFaculty,
  );
  
  router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
  );

export const UserRoutes = router;