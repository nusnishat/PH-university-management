
import QueryBuilder from "../../builder/QueryBuilder";
import { TCourse } from "./course.interface";
import { Course } from "./course.model"
import { searchableField } from "../student/student.constant";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";

const createCourseIntoDb = async(payload: TCourse)=>{
    const result = Course.create(payload);
    return result;
};

const getAllCourseFromDb = async(query: Record<string, unknown>)=>{
    const courseQuery = new QueryBuilder(Course.find()
    .populate('preRequisiteCourses.course'), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

    const result = await courseQuery.modelQuery;
    return result;
};

const getSingleCourseFrom = async(id: string)=>{
    const result = Course.findById(id).populate('preRequisiteCourses.course');
    return result;
};

const deleteCourseFromDb = async(id: string)=>{
    const result = Course.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new: true}
    );
    return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...remainingCourseData } = payload;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // Step 1: Update basic course info
        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            remainingCourseData,
            {
                new: true,
                runValidators: true,
                session,
            }
        );
        if (!updatedBasicCourseInfo) {
            throw new AppError(400, "Failed to update basic course info");
        }

        // Check if there is any preRequisite course to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisites = preRequisiteCourses
                .filter(el => el.course && el.isDeleted)
                .map(el => el.course);

            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                }
            );
            if (!deletedPreRequisiteCourses) {
                throw new AppError(400, "Failed to delete pre-requisite courses");
            }

            // Add new pre-requisites
            const newPreRequisites = preRequisiteCourses.filter(
                el => el.course && !el.isDeleted
            );

            const newPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                }
            );
            if (!newPreRequisiteCourses) {
                throw new AppError(400, "Failed to add pre-requisite courses");
            }
        }

        await session.commitTransaction(); // Commit the transaction
        return updatedBasicCourseInfo; // Return updated course info
    } catch (error) {
        await session.abortTransaction(); // Abort the transaction in case of an error
        throw new AppError(400, "Failed to update course");
    } finally {
        session.endSession(); // End the session in all cases
    }
};

export const CourseServices = {
    createCourseIntoDb,
    getAllCourseFromDb,
    getSingleCourseFrom,
    deleteCourseFromDb,
    updateCourseIntoDb
}