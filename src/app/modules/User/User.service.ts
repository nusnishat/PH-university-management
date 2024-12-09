
import mongoose from "mongoose";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./User.interface";
import { User } from "./User.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import { TAcademicFaculty } from "../academicFaculty/academicFaculty.interface";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Admin } from "../admin/admin.model";


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

const createFacultyIntoDB = async (password: string, payload: TAcademicFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || ("skaisa788");

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await AcademicFaculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TAcademicFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || ("9sdhasa*");

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
    createStudentInToDB,
    createAdminIntoDB,
    createFacultyIntoDB
}
