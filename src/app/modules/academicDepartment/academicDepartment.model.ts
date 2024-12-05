
import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/appError";


const academicDepartmentSchema = new Schema<TAcademicDepartment>({
name:{
    type: String,
    required: true,
    unique: true
},
academicFaculty:{
    ref: "AcademicFaculty",
    type: Schema.Types.ObjectId,
    required: true
}
},
{
    timestamps: true
});

//check for not creating duplicate department
academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists = await AcademicDepartment.findOne({
        name: this.name
    });
    if(isDepartmentExists){
        throw new Error ('This department already exists');
    }
    next();
});

//check 
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartment.findOne(query);
    if(!isDepartmentExists){
        throw new AppError(404,'This department does not exist');
    }
    next();
})



export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);