import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getStudentFromDB = async () => {
  const res = await Student.find({})
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    })
    .populate("user");
  return res;
};

const getStudentSingleFromDB = async (id: string) => {
  const res = await Student.findOne({ id });
  // const res = await Student.aggregate([{ $match: { id } }]);
  return res;
};

const getUpdateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {

  const {name, guardian, localGuardian, ...remainingStudentData} = payload;

  const modifiedUpdateData : Record<string, unknown> = {...remainingStudentData};

  if(name && Object.keys(name).length) {
    for(const [key, value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  
  if(guardian && Object.keys(guardian).length) {
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if(localGuardian && Object.keys(localGuardian).length) {
    for(const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }


  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {new: true, runValidators: true});
  return result;
};

const getStudentDeleteFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student ");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student ");
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    return error;
  }
};

export const StudentServices = {
  getStudentFromDB,
  getStudentSingleFromDB,
  getStudentDeleteFromDB,
  getUpdateStudentFromDB,
};
