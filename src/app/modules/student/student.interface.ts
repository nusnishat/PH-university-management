import { Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface Name{
    firstName: string;
    middleName: string;
    lastName: string;
}
export interface Guardian{
    fatherName: string;
    motherName: string;
    fatherOccupation: string;
    motherOccupation: string;
}
export default interface Student {
 id: number;
 user: Types.ObjectId;
 name: Name;
 age: number;
 address: string;
 guardian: Guardian;
 gender: 'male' | 'female' | 'others';
 bloodGroup: 'A+' | 'AB+' | 'O+';
}