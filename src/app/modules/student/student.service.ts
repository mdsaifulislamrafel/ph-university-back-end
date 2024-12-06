
import { Student } from "./student.model";



const getStudentFromDB = async () => {
  const res = await Student.find({});
  return res;
};

const getStudentSingleFromDB = async (id: string) => {
  //   const res = await Student.findOne({ id });
  const res = await Student.aggregate([{ $match: { id } }]);
  return res;
};

const getStudentDeleteFromDB = async (id: string) => {
  const res = await Student.updateOne({ id }, { isDeleted: true });
  return res;
};

export const StudentServices = {
  getStudentFromDB,
  getStudentSingleFromDB,
  getStudentDeleteFromDB,
};
