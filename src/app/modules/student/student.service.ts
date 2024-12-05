
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../User/User.model";
import { TStudent } from "./student.interface";

// const createStudentToDB = async(student: Student)=>{
//     const result = await StudentModel.create(student);
//     return result;
// }

const getStudentsFromDB = async()=>{
    const result = await Student.find()
    .populate("admissionSemester").populate(
        {
            path: "academicDepartment",
            populate:{
                path: "academicFaculty",
            }
        }
    );
    return result;
};

const getSingleStudentFromDB = async(id: number)=>{
    const result = await Student.findOne({id}).populate("admissionSemester").populate("admissionSemester").populate(
        {
            path: "academicDepartment",
            populate:{
                path: "academicFaculty",
            }
        }
    );
    return result;
};
const updateStudentIntoDB = async(id: number, payload: Partial<TStudent>)=>{
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
      ...remainingStudentData,
    };
  
    /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */
  
    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value;
      }
    }
  
    if (guardian && Object.keys(guardian).length) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdatedData[`guardian.${key}`] = value;
      }
    }
  
    if (localGuardian && Object.keys(localGuardian).length) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdatedData[`localGuardian.${key}`] = value;
      }
    }
  
    console.log(modifiedUpdatedData);
  
    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });
    
    return result;
};

const deleteStudentFromDB = async(id: number)=>{
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deletedStudent = await Student.findOneAndUpdate(
            {id}, 
            {isDeleted: true},
            {new: true, session}
        );

        if(!deletedStudent)
        {
            throw new AppError(400, "Failed to delete student");
        }

        const deletedUser = await User.findOneAndUpdate(
            {id},
            {isDeleted: true},
            {new: true, session}
        );
        if(!deletedUser)
        {
            throw new AppError(400, "Failed to delete user");
        }

        await session.commitTransaction();
        await session.endSession();
        return deletedStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error('Failed to delete student');
    }
    
};

export const StudentServices = {
    getStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentIntoDB
}