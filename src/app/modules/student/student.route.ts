import express from 'express';
import { StudentControllers } from './strudent.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch('/:id', validateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);
router.delete('/:id', StudentControllers.deleteStudent);


export const StudentRoutes = router;
