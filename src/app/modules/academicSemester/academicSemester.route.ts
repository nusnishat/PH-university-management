import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.post('/', validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAcademicSemesters)
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester)
router.put('/:id', AcademicSemesterControllers.updateAcademicSemester)


export const AcademicSemesterRoutes = router;
