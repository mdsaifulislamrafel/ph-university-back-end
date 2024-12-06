import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    }
}, {
    timestamps: true,
});


academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists = await AcademicDepartment.findOne({name: this.name});
    if(isDepartmentExists) {
        throw new Error('Department with this name already exists');
    }
    next();
});


academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();
    const doc = await AcademicDepartment.findOne(query);
    if (!doc) {
        throw new Error('Department id is not valid');
    }
    next();
});


export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);