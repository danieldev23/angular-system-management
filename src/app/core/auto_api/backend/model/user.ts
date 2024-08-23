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
import { AdmissionPointTeacher } from './admissionPointTeacher';
import { AdmissionProfile } from './admissionProfile';
import { BriefTemplate } from './briefTemplate';
import { EnrollmentPeriod } from './enrollmentPeriod';
import { EnrollmentTeacher } from './enrollmentTeacher';
import { ProfileActionLog } from './profileActionLog';
import { ProfileBriefTemplate } from './profileBriefTemplate';

export interface User { 
    id?: number;
    avatar?: string;
    fullName?: string;
    numberPhone?: string;
    email?: string;
    password?: string;
    isTeacher?: number;
    rememberToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
    admissionPointTeacherCreators?: Array<AdmissionPointTeacher>;
    admissionPointTeacherTeachers?: Array<AdmissionPointTeacher>;
    admissionProfiles?: Array<AdmissionProfile>;
    briefTemplates?: Array<BriefTemplate>;
    enrollmentPeriods?: Array<EnrollmentPeriod>;
    enrollmentTeacherCreators?: Array<EnrollmentTeacher>;
    enrollmentTeacherTeachers?: Array<EnrollmentTeacher>;
    profileActionLogs?: Array<ProfileActionLog>;
    profileBriefTemplates?: Array<ProfileBriefTemplate>;
}