
import mongoose from "mongoose";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./User.interface";
import { User } from "./User.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";


const createStudentInToDB = async(password: string, studentData: TStudent)=>{

    const userData: Partial<TUser> = {};

    // set default value of user
    userData.password = password || "jshajKWWWs124***";
    userData.role = "student";

    //find academic semester info
    const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester);

    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateStudentId(admissionSemester);
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); // array
  
      //create a student
      if (!newUser.length) {
        throw new AppError(400, 'Failed to create user');
      }
      // set id , _id as user
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id; //reference _id
  
      // create a student (transaction-2)
  
      const newStudent = await Student.create([studentData], { session });
  
      if (!newStudent.length) {
        throw new AppError(400, 'Failed to create student');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newStudent;
    } catch (error : any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(error);
    }
}

export const UserServices = {
    createStudentInToDB
}
