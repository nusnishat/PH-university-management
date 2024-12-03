import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDb = async(payload: TAcademicFaculty)=>{
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAcademicFacultiesFromDB = async()=>{
    const result = await AcademicFaculty.find();
    return result;
}
const getSingleAcademicFacultyFromDB = async(id: string)=>{
    const result = await AcademicFaculty.findOne({id});
    return result;
}

const updateAcademicFacultyIntoDb = async(id: string, payload: Partial<TAcademicFaculty>)=>{
    const result = await AcademicFaculty.findByIdAndUpdate(
        {_id: id}, 
        payload,
        {new: true}
    );
    return result;
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDb
}