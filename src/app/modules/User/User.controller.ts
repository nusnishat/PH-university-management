import { Request, Response } from "express";
import { UserServices } from "./User.service";

const createStudent = async(req: Request, res: Response)=>{
    const {password, student} = req.body;
    try{
        const result = await UserServices.createStudentInToDB(password, student);
        res.status(200).json({
            status: true,
            message: "created student successfully",
            data: result
        })
    }catch(error){
        res.status(500).json({
            status: false,
            message: "error occured",
            error: error
        })
    }
}

export const UserControllers ={
    createStudent
}
