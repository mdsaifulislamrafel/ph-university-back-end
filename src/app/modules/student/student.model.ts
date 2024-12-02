import { model, Schema } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";
import validator from "validator";


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required."],
    minlength: [3, "First Name should have at least 3 characters"],
    maxlength: [20, "First Name can not exceed 20 characters"],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message:
        "{VALUE} First Name should start with a capital letter and contain only alphabets",
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required."],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} Last Name should contain only alphanumeric characters",
    },
  },
});

const guardianNameSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian's Name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required."],
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required."],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User id is required'],
    unique: true
  },
  name: {
    type: userNameSchema,
    required: [true, "Student's Name is required."],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not a valid gender.",
    },
    required: [true, "Gender is required."],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email Address is required."],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
    },
  },
  contactNo: {
    type: String,
    required: [true, "Contact Number is required."],
  },
  emergencyNo: {
    type: String,
    required: [true, "Emergency Contact Number is required."],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: [
        "A",
        "B",
        "AB",
        "O",
        "A+",
        "B+",
        "AB+",
        "O+",
        "A-",
        "B-",
        "AB-",
        "O-",
      ],
      message: "{VALUE} is not a valid blood group.",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required."],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required."],
  },
  guardian: {
    type: guardianNameSchema,
    required: [true, "Guardian information is required."],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian information is required."],
  },
  profileImg: { type: String },
  isDeleted: { type: Boolean, default: false },
}, {
  toJSON: {
    virtuals: true,
  }
});

// virtual properties drive by mongoose start

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// virtual properties drive by mongoose end

// Query middleware / hooks for mongoose start

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Query middleware / hooks for mongoose end

// creating a custom Statics method start
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// creating a custom instance method end


export const Student = model<TStudent, StudentModel>("Student", studentSchema);
