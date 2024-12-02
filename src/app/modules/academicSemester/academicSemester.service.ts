import { TAcademicSemester, TAcademicSemesterNameCodeMapper } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async(payload: TAcademicSemester)=>{
    const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
        Autumn : "01",
        Summer : "02",
        Fall: "03"
    }
    if(academicSemesterNameCodeMapper[payload.name] !== payload.code)
    {
        throw new Error("Invalid semester code");
    }

    const result = await AcademicSemester.create(payload);
    return result;
}

const getAcademicSemestersFromDB = async()=>{
    const result = await AcademicSemester.find();
    return result;
}
const getSingleAcademicSemesterFromDB = async(id: string)=>{
    const result = await AcademicSemester.findOne({id});
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB
}