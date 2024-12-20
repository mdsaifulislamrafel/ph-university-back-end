
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utils";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import mongoose from "mongoose";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not give , use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";



  // find academic semester info 

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set manually generated id
  userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

  // create user (transaction-1)
  const newUser = await User.create([userData], {session});

  // create student
  if (!newUser.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
  }
  
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference id

    // create student (transaction-2)
    const newStudent = await Student.create([payload], {session});
    if(!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
