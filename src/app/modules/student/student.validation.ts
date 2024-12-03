import { z } from "zod";

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, "First Name should have at least 3 characters.")
    .max(20, "First Name cannot exceed 20 characters.")
    .trim()
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message:
          "First Name should start with a capital letter and contain only alphabets.",
      }
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .nonempty("Last Name is required.")
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last Name should contain only alphabetic characters.",
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's Name is required."),
  fatherOccupation: z.string().nonempty("Father's Occupation is required."),
  fatherContactNo: z.string().nonempty("Father's Contact Number is required."),
  motherName: z.string().nonempty("Mother's Name is required."),
  motherOccupation: z.string().nonempty("Mother's Occupation is required."),
  motherContactNo: z.string().nonempty("Mother's Contact Number is required."),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local Guardian's Name is required."),
  occupation: z.string().nonempty("Local Guardian's Occupation is required."),
  contactNo: z
    .string()
    .nonempty("Local Guardian's Contact Number is required."),
  address: z.string().nonempty("Local Guardian's Address is required."),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty("Password is required."),
    student: z.object({
    name: userNameValidationSchema,
    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({ message: "Gender is required and must be valid." }),
    }),
  
    dateOfBirth: z.string().optional(),
    email: z
      .string()
      .email("Invalid email address.")
      .nonempty("Email Address is required."),
    contactNo: z.string().nonempty("Contact Number is required."),
    emergencyNo: z.string().nonempty("Emergency Contact Number is required."),
    bloodGroup: z
      .enum([
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
      ])
      .optional(),
    presentAddress: z.string().nonempty("Present Address is required."),
    permanentAddress: z.string().nonempty("Permanent Address is required."),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    })
  })
});

export const studentValidations = {
  createStudentValidationSchema,
};
