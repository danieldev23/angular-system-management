import { Component, Input } from '@angular/core';
import { EnrollmentPeriod } from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';

@Component({
    selector: 'app-step-6-summary-component',
    templateUrl: './template.component.html'
})
export class Step6SummaryComponent extends MyBaseComponent {
    @Input({ required: true }) admissions!: EnrollmentPeriod;
    constructor() {
        super();
    }
}
