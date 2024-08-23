// login/controller.component.ts

import { Component } from '@angular/core';
import { MyBaseComponent } from '../../my-base.component';
import { AuthService } from 'src/app/core/auto_api/backend';

@Component({
    selector: 'app-screen-index-guard-component',
    templateUrl: './template.component.html',
    styleUrls: ['./style.component.scss'],
})
export class IndexGuardComponent extends MyBaseComponent {
    constructor(
        private authService: AuthService
    ) {
        super();
    }

    // override ngOnInit(): void {
    //     this.startMsgLoading('Đang gọi api');
    //     this.authService.apiEnvLoginPost({ 
    //         emailOrNumberPhone: 'aaaaaa',
    //         password: 'aaaaa'
    //     }).subscribe((response) => {
    //         this.removeMsgLoading();
    //         if (response.success) {
    //             this.showMsgSuccess('Thành công');
    //         } else {
    //             this.showMsgFailure('Thất bại');
    //             // this.startAskAction('Câu hỏi ngẫu nhiên', '........', 'Đồng ý', 'Không', 'aaa').then((ans) => {
    //             //     this.showMsgSuccess(ans ?? '');
    //             // });


    //             this.startConfirmAction('Bạn có chắc chắn không?', '.....', 'Có', 'Không').then((yesOrNo) => {
    //                 console.log(yesOrNo);
    //             });
    //         }
    //         console.log(response);
    //     })
    // }
}
