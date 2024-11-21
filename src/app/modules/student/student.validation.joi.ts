//   use validation joi for validation useing this student model file

import Joi from "joi";

// Define the schema for UserName
const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .min(3)
      .max(20)
      .regex(/^[A-Z][a-z]*$/)
      .required()
      .messages({
        "string.min": "First Name should have at least 3 characters",
        "string.max": "First Name can not exceed 20 characters",
        "string.pattern.base":
          "First Name should start with a capital letter and contain only alphabets",
        "any.required": "First Name is required.",
      }),
    middleName: Joi.string().trim().optional(),
    lastName: Joi.string()
      .trim()
      .regex(/^[a-zA-Z]+$/)
      .required()
      .messages({
        "string.pattern.base": "Last Name should contain only alphabets",
        "any.required": "Last Name is required.",
      }),
  });

  // Define the schema for Guardian
  const guardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      "any.required": "Father's Name is required.",
    }),
    fatherOccupation: Joi.string().required().messages({
      "any.required": "Father's Occupation is required.",
    }),
    fatherContactNo: Joi.string().required().messages({
      "any.required": "Father's Contact Number is required.",
    }),
    motherName: Joi.string().required().messages({
      "any.required": "Mother's Name is required.",
    }),
    motherOccupation: Joi.string().required().messages({
      "any.required": "Mother's Occupation is required.",
    }),
    motherContactNo: Joi.string().required().messages({
      "any.required": "Mother's Contact Number is required.",
    }),
  });

  // Define the schema for LocalGuardian
  const localGuardianSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Local Guardian's Name is required.",
    }),
    occupation: Joi.string().required().messages({
      "any.required": "Local Guardian's Occupation is required.",
    }),
    contactNo: Joi.string().required().messages({
      "any.required": "Local Guardian's Contact Number is required.",
    }),
    address: Joi.string().required().messages({
      "any.required": "Local Guardian's Address is required.",
    }),
  });

  // Define the schema for the Student
  const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Student ID is required.",
    }),
    name: userNameSchema.required().messages({
      "any.required": "Student's Name is required.",
    }),
    gender: Joi.string()
      .valid("male", "female", "other")
      .required()
      .messages({
        "any.only": "{#value} is not a valid gender.",
        "any.required": "Gender is required.",
      }),
    dateOfBirth: Joi.string().optional(),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email Address is required.",
    }),
    contactNo: Joi.string().required().messages({
      "any.required": "Contact Number is required.",
    }),
    emergencyNo: Joi.string().required().messages({
      "any.required": "Emergency Contact Number is required.",
    }),
    bloodGroup: Joi.string()
      .valid(
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
        "O-"
      )
      .messages({
        "any.only": "{#value} is not a valid blood group.",
      }),
    presentAddress: Joi.string().required().messages({
      "any.required": "Present Address is required.",
    }),
    permanentAddress: Joi.string().required().messages({
      "any.required": "Permanent Address is required.",
    }),
    guardian: guardianSchema.required().messages({
      "any.required": "Guardian information is required.",
    }),
    localGuardian: localGuardianSchema.required().messages({
      "any.required": "Local Guardian information is required.",
    }),
    profileImg: Joi.string().optional(),
    isActive: Joi.string()
      .valid("active", "inactive")
      .default("active")
      .messages({
        "any.only": "{#value} is not a valid status.",
      }),
  });

  export default studentValidationSchema;


