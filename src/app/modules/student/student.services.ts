import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // create for build in instance method for mongoose start

  //   const res = await Student.create(studentData);
  //   return res;
  // create for build in instance method for mongoose end

  // create for build in Statics method for mongoose end

  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }

  const res = await Student.create(studentData);

  // create for build in Statics method for mongoose end

  // create for custom  method for instance method

  // create for custom method or instance start

  //   const student = new Student(studentData);
  //   if (await student.isUserExists(studentData.id)) {
  //       throw new Error("User already exists");
  //     }

  //     const res = await student.save(); // build in instance method for mongoose

  //     return res;

  // create for custom method or instance end

  return res;
};

const getStudentFromDB = async () => {
  const res = await Student.find({});
  return res;
};

const getStudentSingleFromDB = async (id: string) => {
  const res = await Student.findOne({ id });
  return res;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentFromDB,
  getStudentSingleFromDB,
};
