
import { Student } from "./student.model";

// const createStudentToDB = async(student: Student)=>{
//     const result = await StudentModel.create(student);
//     return result;
// }

const getStudentsFromDB = async()=>{
    const result = await Student.find();
    return result;
}

const getSingleStudentFromDB = async(id: number)=>{
    const result = await Student.findOne({id});
    return result;
}

export const StudentServices = {
    getStudentsFromDB,
    getSingleStudentFromDB
}