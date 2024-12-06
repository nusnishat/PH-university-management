
import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../User/User.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableField } from "./student.constant";

// const createStudentToDB = async(student: Student)=>{
//     const result = await StudentModel.create(student);
//     return result;
// }

const getStudentsFromDB = async(query: Record<string, unknown>)=>{
  // let searchTerm = "";
  // const queryObj = {...query};

  // if(query?.searchTerm)
  // {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchableField = ['email', 'name.firstName', 'presentAdress'];

  // const searchQuery = Student.find({
  //   $or: searchableField.map
  //   ((field) =>({
  //     [field]: {$regex: searchTerm, $options: 'i'}
  //   }))
  // });

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach(el => delete queryObj[el]);

  // const filterQuery = searchQuery
  // .find(queryObj)
  // .populate("admissionSemester").populate(
  //     {
  //         path: "academicDepartment",
  //         populate:{
  //             path: "academicFaculty",
  //         }
  //     }
  // );

  // let sort = '-createdAt'; // SET DEFAULT VALUE 
 
  // // IF sort  IS GIVEN SET IT
  //   if (query.sort) {
  //    sort = query.sort as string;
  //  }
  //  const sortQuery = filterQuery.sort(sort);

  //  // PAGINATION FUNCTIONALITY:

  //  let page = 1; // SET DEFAULT VALUE FOR PAGE 
  //  let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
  //  let skip = 0; // SET DEFAULT VALUE FOR SKIP


  // // IF limit IS GIVEN SET IT
  
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // // IF page IS GIVEN SET IT

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // let fields = '-__v'; // SET DEFAULT VALUE

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');

  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(Student.find().populate("admissionSemester")
  .populate(
    {
        path: "academicDepartment",
        populate:{
            path: "academicFaculty",
        }
    }
    ), query)
  .search(searchableField)
  .filter()
  .sort()
  .paginate()
  .fields();

  const result = await studentQuery.modelQuery;
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