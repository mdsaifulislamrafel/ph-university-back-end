import { Schema, model, connect } from 'mongoose';

export type UserName = {
    firstName: string;
    middleName: string;
    lastName: string;
};

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};


export type Student = {
    id: string;
    name: UserName;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyNo: string;
    bloodGroup: 'A' | 'B' | 'AB' | 'O' | 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    avatar?: string;
  }