import { RequestHandler } from "express";

import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsync(async(req, res, next)=>{

    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "created academic semester successfully",
        data: result,
    });
})

const getAcademicSemesters: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await AcademicSemesterServices.getAcademicSemestersFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got AcademicSemester successfully",
        data: result,
    });
});

const getSingleAcademicSemester: RequestHandler = catchAsync(async(req, res, next)=>{
    const academicSemesterId = req.params.id;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(academicSemesterId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got student successfully",
        data: result,
    });
})


export const AcademicSemesterControllers ={
    createAcademicSemester,
    getAcademicSemesters,
    getSingleAcademicSemester
}
