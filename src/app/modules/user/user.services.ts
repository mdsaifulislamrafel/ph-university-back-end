import config from "../../config";
import { TStudent } from "../student/student.interface";
import { User } from "./user.model";
import { TUser } from "./user.interface";
import { Student } from "../student/student.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { generateStudentId } from "./user.utlis";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not give , use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";



  // find academic semester info 

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  // set manually generated id
  userData.id = await generateStudentId(admissionSemester);

  // create user
  const newUser = await User.create(userData);

  // create student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; // reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
