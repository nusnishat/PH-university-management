import bcrypt from 'bcrypt';
// import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../../config';
// import AppError from '../../errors/AppError';
// import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { User } from '../User/User.model';
import AppError from '../../errors/AppError';
// import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({id:payload?.id}).select('+password');

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

  //checking if the password is correct 0fe26a4657cd0746c37d551d2bdbfd3694d3f39db0cef6d6aa52b355913b882d

  const isPasswordMatched = bcrypt.compare(payload?.password, user?.password);
  if(!isPasswordMatched){
    throw new AppError(403, 'Password not matched');
  }

  //create token and sent to the  client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const secret = '0fe26a4657cd0746c37d551d2bdbfd3694d3f39db0cef6d6aa52b355913b882d'

  const accessToken = jwt.sign(jwtPayload, secret, {
    expiresIn: '10d'
  })

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   const refreshToken = createToken(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     config.jwt_refresh_expires_in as string,
//   );

  return {
    accessToken,
    // refreshToken,
    needsPasswordChange: user?.needsPasswordChnage,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.findOne({id:userData?.userId}).select('+password');

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(401, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(401, 'This user is blocked ! !');
  }

  //checking if the password is correct

  const isPasswordMatched = await bcrypt.compare(payload.oldPassword, user?.password);
  if(!isPasswordMatched){
    throw new AppError(403, 'Password not matched');
  }


  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(14),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string,
//   ) as JwtPayload;

//   const { userId, iat } = decoded;

//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(401, 'This user is deleted !');
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status;

//   if (userStatus === 'blocked') {
//     throw new AppError(401, 'This user is blocked ! !');
//   }

//   if (
//     user.passwordChangedAt &&
//     User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//   ) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
//   }

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   return {
//     accessToken,
//   };
// };

export const AuthServices = {
  loginUser,
  changePassword,
//   refreshToken,
};