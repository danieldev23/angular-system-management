/**
 * Api
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { User } from './user';

export interface EnrollmentTeacher { 
    id?: number;
    enrollmentId?: number;
    fullName?: string;
    email?: string;
    teacherId?: number;
    creatorId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    creator?: User;
    teacher?: User;
}