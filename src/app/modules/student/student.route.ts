import express from 'express';
import { StudentControllers } from './strudent.controller';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getStudents);
router.get('/:id', StudentControllers.getStudents);


export const StudentRoutes = router;
