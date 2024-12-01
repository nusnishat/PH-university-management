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

const getSingleStudents: RequestHandler = catchAsync(async(req, res, next)=>{
    const studentId = req.params.id
    const result = await StudentServices.getSingleStudentFromDB(parseInt(studentId))
    
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got student successfully",
        data: result,
    });
})

export const StudentControllers = {
    getStudents,
    getSingleStudents
}