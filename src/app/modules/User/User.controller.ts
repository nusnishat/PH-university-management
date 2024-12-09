import { RequestHandler } from "express";
import { UserServices } from "./User.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async(req, res, next)=>{
    const {password, student} = req.body;
    const result = await UserServices.createStudentInToDB(password, student);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "created student successfully",
        data: result,
    });
})

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
  
    const result = await UserServices.createFacultyIntoDB(password, facultyData);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Faculty is created succesfully',
      data: result,
    });
  });
  
  const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
  
    const result = await UserServices.createAdminIntoDB(password, adminData);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
  });
  
  export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
  };

