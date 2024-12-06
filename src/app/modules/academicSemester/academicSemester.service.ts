import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicSemester.const";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemester.find({});
  return  result;
};

const getSingleAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
}

const updateSingleAcademicSemesterIntoDB = async(id: string, payload: Partial<TAcademicSemester>) => {
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.findByIdAndUpdate({_id: id}, payload, {new: true});
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterIntoDB,
  getSingleAcademicSemesterIntoDB,
  updateSingleAcademicSemesterIntoDB,
};
