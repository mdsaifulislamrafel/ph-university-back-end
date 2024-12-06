import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
};

const getAllAcademicDepartmentsIntoDB = async () => {
    const result = await AcademicDepartment.find({}).populate('academicFaculty');
    return result;
};

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
};

const updateSingleAcademicDepartmentIntoDB = async (id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
};


export const AcademicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsIntoDB,
    getSingleAcademicDepartmentIntoDB,
    updateSingleAcademicDepartmentIntoDB,
};