import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';


const router = express.Router();

router.post('/',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
    );

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put('/:courseId/assign-faculties', CourseControllers.assignFaculties);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;