
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './academicFaculty.controller';
import { updateAcademicFacultyValidationSchema } from './academicFaculty.validation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateAcademicFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const AcademicFacultyRoutes = router;
