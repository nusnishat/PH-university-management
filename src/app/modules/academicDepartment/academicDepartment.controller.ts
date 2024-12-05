import { RequestHandler } from "express";

import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";


const createAcademicDepartment: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "created academic Department successfully",
        data: result,
    });
})

const getAcademicFaculties: RequestHandler = catchAsync(async(req, res, next)=>{
    const result = await AcademicDepartmentServices.getAcademicFacultiesFromDB();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got Academic Department successfully",
        data: result,
    });
});

const getSingleAcademicDepartment: RequestHandler = catchAsync(async(req, res, next)=>{
    const DepartmentId = req.params.id;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(DepartmentId);
    console.log(DepartmentId, result)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "got single Department successfully",
        data: result,
    });
})
const updateAcademicDepartment: RequestHandler = catchAsync(async(req, res, next)=>{
    const DepartmentId = req.params.id;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(DepartmentId, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "updated Department successfully",
        data: result,
    });
});


export const AcademicDepartmentControllers ={
    createAcademicDepartment,
    getAcademicFaculties,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}
