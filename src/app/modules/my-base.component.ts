import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Confirm, IConfirmOptions, INotifyOptions, Loading, Notify, Report } from "notiflix";
import { UserService } from '../core/services/user.service';
import { User } from '../core/auto_api/backend';
import { RedirectService } from '../core/services/redirect.service';

@Component({
	selector: 'selector-name',
	template: ``,
})
export class MyBaseComponent implements OnInit {
	public subscriptions: Subscription = new Subscription();
	public title = inject(Title);
	public userService = inject(UserService);
	public redirectService = inject(RedirectService);
	get accountUser(): User {
		return this.userService.getUserObj() ?? {};
	}

	private static OptionConfirmPopup: IConfirmOptions = { position: 'center-top', width: '350px', messageMaxLength: 1000 }
	private static OptionNotifyPopup: INotifyOptions = { position: 'center-top', width: '400px', messageMaxLength: 1000, showOnlyTheLastOne: true }

	constructor() { }

	ngOnInit() { }
	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	processResponse<T>(response: { success?: number; data?: T }): T | undefined {
		if (response.success && response.data !== undefined) {
			return response.data;
		}
		this.removeMsgLoading();
		this.showMsgFailure('Thực hiện thao tác không thành công. Vui lòng thử lại');
		return undefined;
	}

	protected startMsgLoading(msg: string): void {
		Loading.pulse(msg, { svgColor: '#3f51b5' });
	}

	protected changeMsgLoading(msg: string): void {
		Loading.change(msg);
	}

	protected removeMsgLoading(): void {
		Loading.remove();
	}
	
	protected startConfirmAction(title: string, msg: string, sayYes: string, sayNo: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			Confirm.show(title, msg, sayYes, sayNo,
				() => { resolve(true); }, () => { reject(false); },
				MyBaseComponent.OptionConfirmPopup,
			);
		});
	}

	protected startAskAction(title: string, msg: string, sayYes: string, sayNo: string, answer: string): Promise<string | undefined> {
		return new Promise<string | undefined>((resolve, reject) => {
			Confirm.prompt(title, msg, answer, sayYes, sayNo,
				(clientAnswer) => { resolve(clientAnswer); }, () => { reject(undefined); },
				MyBaseComponent.OptionConfirmPopup,
			);
		});
	}

	protected showMsgSuccess(msg: string): void {
		Notify.success(msg, undefined, MyBaseComponent.OptionNotifyPopup);
	}

	protected showMsgFailure(msg: string): void {
		Notify.failure(msg, undefined, MyBaseComponent.OptionNotifyPopup);
	}

	protected showReportFailureMsg(title: string, msg: string, sayYes: string): void {
		Report.warning(title, msg, sayYes);
	}

	public get initMyTinyEditor(): { apiKey: string, configs: any } {
		return {
			apiKey: "q2b0xww12b2xbx637vp80iafuvwuc9zkep6qoceo62ba6qcs",
			configs: {
				menubar: false,
				plugins: [],
				toolbar:
				  'undo redo | formatselect | bold italic backcolor | \
				  alignleft aligncenter alignright alignjustify | \
				  bullist numlist outdent indent | removeformat | help'
			  }
		}
	}

	public logout() {
		this.startConfirmAction('Đăng xuất', 'Bạn có muốn đăng xuất khỏi tài khoản', 'Đăng xuất', 'hủy').then((value) => {
			if (value) {
				this.userService.logout();
				this.redirectService.redirectLogin();
			}
		})
	}
}
