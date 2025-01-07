import { model, Schema } from "mongoose";
import { TUser } from "./User.interface";
import bcrypt from "bcrypt"


const userSchema = new Schema <TUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: 0
    },
    needsPasswordChnage:{
        type: Boolean,
        default: true
    },
    passwordChangedAt:{
        type: Date
    },
    role:{
        type: String,
        enum: ['admin', 'faculty', 'student']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
}
);
userSchema.pre('save', async function (next) {
    const user = this;
    // hasing password and save into db
    user.password = await bcrypt.hash(
        user.password,
        Number(12)
    );
    next();
});

//set "" after saving password
userSchema.post('save', function(doc, next){
    doc.password = "";
    next();
});

export const User = model<TUser>('User', userSchema)