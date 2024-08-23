import { Component, Input } from '@angular/core';
import { AdmissionProfile, EnrollmentPeriod, EnrollmentTeacher } from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';

@Component({
    selector: 'app-step-3-set-up-council-component',
    templateUrl: './template.component.html'
})
export class Step3SetUpCouncilComponent extends MyBaseComponent {
    @Input({ required: true }) admissions!: EnrollmentPeriod;
    @Input({ required: true }) admissionProfiles: AdmissionProfile[] = [];
    @Input({ required: true }) listTeachers: EnrollmentTeacher[] = [];
    constructor() {
        super();
    }


}
