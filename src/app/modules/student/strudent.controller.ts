import {  NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";


// const createStudent = async(req: Request, res: Response)=>{
//     const student = req.body.student;
//     try{
//         const result = await StudentServices.createStudentToDB(student);
//         res.status(200).json({
//             status: true,
//             message: "created student successfully",
//             data: result
//         })
//     }catch(error){
//         res.status(500).json({
//             status: false,
//             message: "error occured",
//             error: error
//         })
//     }
// }


const getStudents: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await StudentServices.getStudentsFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got students successfully",
        data: result,
    });
})

const getSingleStudent: RequestHandler = catchAsync(async(req, res, next)=>{
    const studentId = req.params.id
    const result = await StudentServices.getSingleStudentFromDB(parseInt(studentId))
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got student successfully",
        data: result,
    });
});

const deleteStudent: RequestHandler = catchAsync(async(req, res, next)=>{
    const studentId = req.params.id
    const result = await StudentServices.deleteStudentFromDB(parseInt(studentId))
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "student deleted successfully",
        data: result,
    });
});
const updateStudent: RequestHandler = catchAsync(async(req, res, next)=>{
    const studentId = req.params.id;
    const {student} = req.body;
    const result = await StudentServices.updateStudentIntoDB(parseInt(studentId), student)
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "student updated successfully",
        data: result,
    });
});

export const StudentControllers = {
    getStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent
}