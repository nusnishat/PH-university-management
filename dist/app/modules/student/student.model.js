"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'], //you can show custom message like this
        validate: {
            validator: (value) => validator_1.default.isAlpha(value), // npm validator used here to validate
            message: '{VALUE} not valid'
        }
    },
    middleName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //custom validation done here
                return firstNameStr === value;
            },
            message: "{VALUE} is not in capitalize forrmat"
        }
    },
    lastName: {
        type: String,
        required: true,
        minlength: [4, 'lastName should be atleast four character'],
        trim: true
    }
});
const guardianSchema = new mongoose_1.Schema({
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    fatherOccupation: {
        type: String,
        required: true
    },
    motherOccupation: {
        type: String,
        required: true
    },
});
const studentSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
        unique: true, //set id as unique value
    },
    name: nameSchema,
    age: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    guardian: guardianSchema,
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'AB+', 'O+'],
            message: "{VALUE} is not valid. Please put A+, AB+ or O+", ///you can show custom message in enum like this
        },
        required: true
    }
});
exports.StudentModel = (0, mongoose_1.model)('StudentModel', studentSchema);
