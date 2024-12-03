import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';


const router = express.Router();

router.post('/', validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)
router.get('/', AcademicFacultyControllers.getAcademicFaculties)
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty)
router.put('/:id', validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)


export const AcademicFacultyRoutes = router;
