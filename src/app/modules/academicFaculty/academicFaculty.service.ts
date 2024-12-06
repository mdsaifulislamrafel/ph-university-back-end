import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
};


const getAcademicFacultyIntoDB = async () => {
    const res = await AcademicFaculty.find({});
    return res;
};

const getSingleAcademicFacultyIntoDB = async (id: string) => {
    const res = await AcademicFaculty.findById(id);
    return res;
};

const updateAcademicFacultyIntoDB = async (id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAcademicFacultyIntoDB,
    getSingleAcademicFacultyIntoDB,
    updateAcademicFacultyIntoDB,
};