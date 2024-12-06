
import { Student } from "./student.model";



const getStudentFromDB = async () => {
  const res = await Student.find({}).populate('academicDepartment').populate('admissionSemester').populate('user');
  return res;
};

const getStudentSingleFromDB = async (id: string) => {
    const res = await Student.findById(id);
  // const res = await Student.aggregate([{ $match: { id } }]);
  return res;
};

const getStudentDeleteFromDB = async (id: string) => {
  const res = await Student.updateOne({ id }, { isDeleted: true }).populate('academicDepartment').populate('admissionSemester').populate('user');
  return res;
};

export const StudentServices = {
  getStudentFromDB,
  getStudentSingleFromDB,
  getStudentDeleteFromDB,
};
