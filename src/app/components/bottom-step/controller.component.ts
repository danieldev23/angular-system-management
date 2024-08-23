import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnrollmentPeriod } from 'src/app/core/auto_api/backend';
import { MyBaseComponent } from 'src/app/modules/my-base.component';

@Component({
    selector: 'app-bottom-step-component',
    templateUrl: './template.component.html'
})
export class BottomStepComponent extends MyBaseComponent {
    @Output() onCompleted = new EventEmitter<void>();
    @Output() onSaved = new EventEmitter<void>();
    constructor() {
        super();
    }
}