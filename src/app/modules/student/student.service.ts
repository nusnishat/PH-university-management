import Student from "./student.interface";
import { StudentModel } from "./student.model";

// const createStudentToDB = async(student: Student)=>{
//     const result = await StudentModel.create(student);
//     return result;
// }

const getStudentsFromDB = async()=>{
    const result = await StudentModel.find();
    return result;
}

const getSingleStudentFromDB = async(id: number)=>{
    const result = await StudentModel.findOne({id});
    return result;
}

export const StudentServices = {
    getStudentsFromDB,
    getSingleStudentFromDB
}