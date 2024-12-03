import { RequestHandler } from "express";

import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty: RequestHandler = catchAsync(async(req, res, next)=>{

    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "created academic Faculty successfully",
        data: result,
    });
})

const getAcademicFaculties: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got AcademicFaculty successfully",
        data: result,
    });
});

const getSingleAcademicFaculty: RequestHandler = catchAsync(async(req, res, next)=>{
    const facultyId = req.params.id;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    console.log(facultyId, result)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got single faculty successfully",
        data: result,
    });
})
const updateAcademicFaculty: RequestHandler = catchAsync(async(req, res, next)=>{
    const FacultyId = req.params.id;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(FacultyId, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "updated faculty successfully",
        data: result,
    });
});


export const AcademicFacultyControllers ={
    createAcademicFaculty,
    getAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
}
