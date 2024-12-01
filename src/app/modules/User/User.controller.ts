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

export const UserControllers ={
    createStudent
}
