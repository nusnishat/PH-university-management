import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester', validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAcademicSemesters)
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester)


export const AcademicSemesterRoutes = router;
