import express from 'express';
import { UserControllers } from './User.controller';
import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createAcademicFacultyValidationSchema } from '../academicFaculty/academicFaculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './User.constant';
const router = express.Router();

router.post('/create-student', auth(USER_ROLE.admin), validateRequest(createStudentValidationSchema) , UserControllers.createStudent);
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