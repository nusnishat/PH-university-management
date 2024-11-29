import { Request, Response } from "express";
import { StudentServices } from "./student.service";

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

const getStudents = async(req: Request, res: Response)=>{
    try{
        const result = await StudentServices.getStudentsFromDB();
        res.status(200).json({
            status: true,
            message: "get students successfully",
            data: result
        })
    }catch(error){
        console.log(error)
    }
}

const getSingleStudents = async(req: Request, res: Response)=>{
    try{
        const studentId = req.params.id
        const result = await StudentServices.getSingleStudentFromDB(parseInt(studentId))
        res.status(200).json({
            status: true,
            message: "got student successfully",
            data: result
        })
    }catch(error){
        console.log(error)
    }
}

export const StudentControllers = {
    getStudents,
    getSingleStudents
}