import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

// const getStudentFromDB = async (query: Record<string, unknown>) => {
//   let searchTram = "";
//   if (query?.searchTram) {
//     searchTram = query?.searchTram as string;
//   }
//   const res = await Student.find({
//     $or: ["email", "name.firstName", "presentAddress"].map((field) => ({
//       [field]: { $regex: searchTram, $options: "i" },
//     })),
//   })
//     .populate("admissionSemester")
//     .populate({
//       path: "academicDepartment",
//       populate: {
//         path: "academicFaculty",
//       },
//     })
//     .populate("user");
//   return res;
// };

const getStudentFromDB = async (query: Record<string, unknown>) => {
  
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
  let searchTram = "";
  if (query?.searchTram) {
    searchTram = query?.searchTram as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTram, $options: "i" },
    })),
  });

  // filtering filed delete
  const queryObject = { ...query };
  const excludeFields = ["searchTram", "sort", "limit", "page", "fields"];
  console.log("base query", {query}, {queryObject});
  excludeFields.forEach((el) => delete queryObject[el]);
  // filtering filed delete
  const filterQuery = searchQuery
    .find(queryObject)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });

  let sort = "-createdAt";

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);

  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) {
    limit = +query.limit;
  }

  if (query.page) {
    page = +query.page;
    skip = (page - 1) * limit;
  }

  const paginationQuery = sortQuery.skip(skip);

  const limitQuery = paginationQuery.limit(limit);

  // fields limiting query
  let fields = '-__v'
  if(query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const fieldsLimiting = await limitQuery.select(fields)

  // fields limiting query

  return fieldsLimiting;
};

const getStudentSingleFromDB = async (id: string) => {
  const res = await Student.findOne({ id });
  // const res = await Student.aggregate([{ $match: { id } }]);
  return res;
};

const getUpdateStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
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
