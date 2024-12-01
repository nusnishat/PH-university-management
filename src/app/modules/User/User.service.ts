
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./User.interface";
import { User } from "./User.model";

const createStudentInToDB = async(password: string, studentData: TStudent)=>{

    const userData: Partial<TUser> = { };

    // set default value of user
    userData.password = password || "jshajKWWWs124***";
    userData.role = "student";
    userData.id = "1810006"

    //create user
    const newUser = await User.create(userData);

    if(Object.keys(newUser).length)
    {
        studentData.id = newUser.id;
        studentData.user = newUser._id
        const newStudent = await Student.create(studentData);
        return newStudent;
    }
}

export const UserServices = {
    createStudentInToDB
}
