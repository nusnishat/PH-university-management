import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/User/User.interface';
import { User } from '../modules/User/User.model';
const auth = (...requiredRoles : TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if(!token){
        throw new AppError(401, "You are not authorized")
    }

    const secret = '0fe26a4657cd0746c37d551d2bdbfd3694d3f39db0cef6d6aa52b355913b882d'

    const decoded = jwt.verify(
        token,
        secret,
    ) as JwtPayload;

    const {userId, role, iat} = decoded.role;

    const user = await User.findOne({id:userId}).select('+password');

    if (!user) {
        throw new AppError(404, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(403, 'This user is deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(403, 'This user is blocked ! !');
    }

    if(user.passwordChangedAt){
        const passwordChangeTime = new Date(user.passwordChangedAt).getTime()/1000;
        if(passwordChangeTime>iat){
            throw new AppError(401, "You are not authorized")
        }
    }


    if(requiredRoles && !requiredRoles.includes(role)){
        throw new AppError(401, "You are not authorized")
    }

    req.user = decoded;
  
    next();
  });
};

export default auth;