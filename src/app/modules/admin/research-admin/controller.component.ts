// login/controller.component.ts

import { Component } from '@angular/core';
import { MyBaseComponent } from '../../my-base.component';
import { AuthService } from 'src/app/core/auto_api/backend';

@Component({
    selector: 'app-screen-research-admin-component',
    templateUrl: './template.component.html',
    styleUrls: ['./style.component.scss'],
})
export class ResearchAdminComponent extends MyBaseComponent {
    constructor() {
        super();
    }
}
