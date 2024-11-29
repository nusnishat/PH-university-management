import { Schema, model, connect } from 'mongoose';
import Student, { Guardian, Name } from './student.interface';
import validator from 'validator';


const nameSchema = new Schema<Name>({
    firstName: {
        type: String,
        required:[true,'first name is required'], //you can show custom message like this
        validate: {
            validator: (value: string)=> validator.isAlpha(value), // npm validator used here to validate
            message: '{VALUE} not valid'
        }
    },
    middleName: {
        type: String,
        required: true,
        validate:{
            validator: function(value){
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //custom validation done here
                return firstNameStr === value;
            },
            message: "{VALUE} is not in capitalize forrmat"
        }
    },
    lastName: {
        type: String,
        required: true,
        minlength:[4, 'lastName should be atleast four character'],
        trim: true
    }
})

const guardianSchema = new Schema<Guardian>({
    fatherName:{
        type: String,
        required: true
    },
    motherName:{
        type: String,
        required: true
    },
    fatherOccupation:{
        type: String,
        required: true
    },
    motherOccupation:{
        type: String,
        required: true
    },
})

const studentSchema = new Schema<Student>({
    id:{
        type: Number,
        required: true,
        unique: true, //set id as unique value
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    name: nameSchema,
    age:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    guardian:guardianSchema,
    gender: {
        type: String,
        enum:['male','female', 'others'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum:{
            values:['A+', 'AB+', 'O+'],
            message: "{VALUE} is not valid. Please put A+, AB+ or O+", ///you can show custom message in enum like this
        },
        required: true
    }
})

export const StudentModel = model<Student>('StudentModel', studentSchema);