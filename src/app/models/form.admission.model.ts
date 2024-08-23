import { FormControl } from '@angular/forms';
import { EnrollmentPeriodAcademicDegree } from '../core/auto_api/backend/model/enrollmentPeriodAcademicDegree';

export interface FormCreateAdmission {
    academicYearPrefix: FormControl<string | null>;
    academicYearStart: FormControl<number | null>;
    academicYearEnd: FormControl<number | null>;
    academicDegree: FormControl<EnrollmentPeriodAcademicDegree | null>;
    startTime: FormControl<Date | null>;
    isSendingResumesFreely: FormControl<number | null>;
  }
