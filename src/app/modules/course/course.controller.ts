import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDb(req.body);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Course is created succesfully',
      data: result,
    });
  });  

const getSingleCourse = catchAsync(async (req, res) => {
  const  id  = req.params.id;
  const result = await CourseServices.getSingleCourseFrom( id );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is retrieved succesfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDb(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Coursea are retrieved succesfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.updateCourseIntoDb( id , req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is updated succesfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CourseServices.deleteCourseFromDb(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course is deleted succesfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse
};