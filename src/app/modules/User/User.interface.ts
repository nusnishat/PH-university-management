import { USER_ROLE } from "./User.constant";

export  type TUser = {
    id: string;
    password: string;
    needsPasswordChnage: boolean;
    passwordChangedAt?: Date;
    role: 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
}

export type NewUser = {
    id: string;
    password: string;
    role: string
}

export type TUserRole = keyof typeof USER_ROLE;  