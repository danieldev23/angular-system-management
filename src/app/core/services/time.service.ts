import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimeService {
    constructor() { }
	calculationTime(timeCreate: Date | string | undefined, endTime?: Date | string): string {
		let curDate: Date = endTime ? new Date(endTime) : new Date();
		let startTime: Date = new Date(timeCreate ?? Date.now());
		let seconds = Math.floor((curDate.getTime() - startTime.getTime()) / 1000);
		let interval = seconds / 31536000;
		let yearTrans = 'năm';
		let monthTrans = 'tháng';
		let dayTrans = 'ngày';
		let clockTrans = 'giờ';
		let minuteTrans = 'phút';
		let secondTrans = 'giây';
		if (interval > 1) {
			return Math.floor(interval) + ' ' + yearTrans;
		}
		interval = seconds / 2592000;
		if (interval > 1) {
			return Math.floor(interval) + ' ' + monthTrans;
		}
		interval = seconds / 86400;
		if (interval > 1) {
			return Math.floor(interval) + ' ' + dayTrans;
		}
		interval = seconds / 3600;
		if (interval > 1) {
			return Math.floor(interval) + ' ' + clockTrans;
		}
		interval = seconds / 60;
		if (interval > 1) {
			return Math.floor(interval) + ' ' + minuteTrans;
		}
		return Math.floor(seconds) + ' ' + secondTrans;
	}
	calculationTimeAgoOnlyDate(timeCreate: Date | string | undefined, endTime?: Date | string): string {
		let curDate: Date = endTime ? new Date(endTime) : new Date();
		let startTime: Date = new Date(timeCreate ?? Date.now());
		let dayTrans = 'ngày';
		let todayTrans = 'Hôm nay';
		let agoTrans = 'trước';
		let seconds = Math.floor((curDate.getTime() - startTime.getTime()) / 1000);
		if (seconds == 0) {
			return todayTrans ?? 'Hôm nay';
		}
		let interval = seconds / 86400;
		if (interval >= 1) {
			return Math.floor(interval) + ' ' + dayTrans + ' ' + agoTrans;
		}
		return '';
	}
	calculationTestedTime(timeCreate: Date | string | undefined, endTime?: Date | string): string {
		let curDate: Date = endTime ? new Date(endTime) : new Date();
		let startTime: Date = new Date(timeCreate ?? Date.now());
		let seconds = Math.floor((curDate.getTime() - startTime.getTime()) / 1000);
		let interval = seconds / 31536000; //year
		let yearTrans = 'năm';
		let monthTrans = 'tháng';
		let dayTrans = 'ngày';
		let clockTrans = 'giờ';
		let minuteTrans = 'phút';
		let secondTrans = 'giây';
		if (interval > 1) {
			return Math.floor(interval) + ' ' + yearTrans;
		}
		interval = seconds / 2592000; // month
		if (interval > 1) {
			return Math.floor(interval) + ' ' + monthTrans;
		}
		interval = seconds / 86400; //day
		if (interval > 1) {
			return Math.floor(interval) + ' ' + dayTrans;
		}
		interval = seconds / 3600; //hour
		if (interval > 1) {
			return Math.floor(interval) + ' ' + clockTrans;
		}
		interval = seconds / 60; //minutes
		if (interval > 1) {
			return Math.floor(interval) + ' ' + minuteTrans;
		}
		return Math.floor(seconds) + ' ' + secondTrans;
	}
	calculationTimeExamTested(startTime: Date | string | undefined, endTime?: Date | string): string {
		var startDate = new Date(startTime ?? '');
		var endDate = endTime ? new Date(endTime) : new Date();
		var diff = endDate.getTime() - startDate.getTime();
		var days = Math.floor(diff / (60 * 60 * 24 * 1000));
		var hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
		var minutes = Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
		var seconds = Math.floor(diff / 1000) - (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);

        let dayTrans = 'ngày';
        let hourTrans = 'giờ';
        let minuteTrans = 'phút';
        let secondTrans = 'giây';

		let returnString = ' ';
		if (days > 0) {
			returnString += days + ' ' + dayTrans + ' ';
		}
		if (hours > 0) {
			returnString += hours + ' ' + hourTrans + ' ';
		}
		if (minutes > 0) {
			returnString += minutes + ' ' + minuteTrans + ' ';
		}
		if (!days && !hours) {
			returnString += seconds + ' ' + secondTrans;
		}
		return returnString;
	}
	calculationTimeOnlyMinutes(timeCreate: Date | string | undefined, endTime?: Date | string): string {
		let curDate: Date = endTime ? new Date(endTime) : new Date();
		let startTime: Date = new Date(timeCreate ?? Date.now());
		let seconds = Math.floor((curDate.getTime() - startTime.getTime()) / 1000);
		let interval = 0;
		interval = seconds / 60;
		return interval.toFixed(2);
	}
	calculationHomeworkTimeWithZeroSecond(inputStartTime: Date | string, inputEndTime?: Date | string): number {
		let newInputStartTime = new Date(inputStartTime);
		let startTime: Date = new Date(this.getSecondOfDateWithZeroSecond(newInputStartTime) * 1000);
		let newInputEndTime = inputEndTime ? new Date(inputEndTime) : new Date();
		let endTime: Date = new Date(this.getSecondOfDateWithZeroSecond(newInputEndTime) * 1000);
		if (startTime.getTime() - endTime.getTime() > 0) {
			let seconds = Math.floor((startTime.getTime() - endTime.getTime()) / 1000);
			return seconds;
		} else {
			return -1;
		}
	}
	getDiffFromTwoDateWithZeroSecond(inputStartTime: Date | string, inputEndTime?: Date | string): number {
		let newInputStartTime = new Date(inputStartTime);
		let startTime: Date = new Date(this.getSecondOfDateWithZeroSecond(newInputStartTime) * 1000);
		let newInputEndTime = inputEndTime ? new Date(inputEndTime) : new Date();
		let endTime: Date = new Date(this.getSecondOfDateWithZeroSecond(newInputEndTime) * 1000);
		let seconds = Math.floor((startTime.getTime() - endTime.getTime()) / 1000);
		return seconds;
	}
	getFormatDate(date: Date | string | number): string {
		let today = new Date(date);
		let dd = `${today.getDate()}`;
		let mm = `${today.getMonth() + 1}`;
		let yyyy = today.getFullYear();
		if (Number(dd) < 10) {
			dd = `0${dd}`;
		}

		if (Number(mm) < 10) {
			mm = `0${mm}`;
		}
		return `${dd}/${mm}/${yyyy}`;
	}
	getFormatDateForExport(today: Date): string {
		let dd = `${today.getDate()}`;
		let mm = `${today.getMonth() + 1}`;
		let yyyy = today.getFullYear();
		if (Number(dd) < 10) {
			dd = `0${dd}`;
		}

		if (Number(mm) < 10) {
			mm = `0${mm}`;
		}
		return `${dd}_${mm}_${yyyy}`;
	}
	getSecondOfDateWithZeroSecond(date: Date): number {
		var secondOfDate = date.getSeconds();
		let second = Math.floor(date.getTime() / 1000) - secondOfDate;
		return second;
	}
	getCurrentSecond(): number {
		let d = new Date();
		let second = Math.floor(d.getTime() / 1000);
		return second;
	}
	getCurrentMillisecond(): number {
		let d = new Date();
		let second = d.getTime();
		return second;
	}
	convertHMS(sec: number): string {
		let hours: number = Math.floor(sec / 3600); // get hours
		let minutes: number = Math.floor((sec - hours * 3600) / 60); // get minutes
		let seconds: number = sec - hours * 3600 - minutes * 60; //  get seconds
		// add 0 if value < 10; Example: 2 => 02
		let clockTrans = 'giờ';
		let minuteTrans = 'phút';
		let secondTrans = 'giây';

		let hoursStr: string = hours < 10 ? '0' + hours : hours.toString();
		let minutesStr: string = minutes < 10 ? '0' + minutes : minutes.toString();
		let secondsStr: string = seconds < 10 ? '0' + seconds : seconds.toString();
		let returnString = hoursStr + ' ' + clockTrans + ' ' + minutesStr + ' ' + minuteTrans;
		if (!hoursStr && !minutesStr) {
			returnString += ' ' + secondsStr + ' ' + secondTrans;
		}
		return returnString; // Return is HH : MM : SS
	}
    
	getDateFormatByUserUnitForDatePicker(): string {
		var curDateFormat = undefined;
		if (curDateFormat == 'MM/dd/yyyy') {
			return 'MM-DD-YYYY';
		} else {
			return 'DD-MM-YYYY';
		}
	}

	//Default formate
	getDefaultDateFormat(): string {
		return 'dd/MM/yyyy';
	}
	getListDateFormat(): string[] {
		return ['dd/MM/yyyy', 'MM/dd/yyyy'];
	}
	getCurrentWeeks(): number {
		const currentDate = new Date();
		const startDate = new Date(currentDate.getFullYear(), 0, 1);
		const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
		const weekNumber = Math.ceil(days / 7);
		return weekNumber;
	}
	getSchoolWeeks(): number {
		const currentTime: Date = new Date(Date.now());
		const startSchoolMonth = 9;
		const schoolYear = currentTime.getMonth() >= startSchoolMonth ? currentTime.getFullYear() : currentTime.getFullYear() + 1;
		let startTimeSchool = new Date(`09/05/${schoolYear}`);
		let diff = (currentTime.getTime() - startTimeSchool.getTime()) / 1000;
		diff /= 60 * 60 * 24 * 7;
		return Math.abs(Math.round(diff));
	}
	formatDateTimeFillData(inputDateString: string): string | Date {
		const dateComponents = inputDateString.split(/[\s,/:]+/);
		const formattedDate = new Date(
			Date.UTC(
				parseInt(dateComponents[2]),
				parseInt(dateComponents[1]) - 1,
				parseInt(dateComponents[0]),
				parseInt(dateComponents[3]),
				parseInt(dateComponents[4]),
				parseInt(dateComponents[5])
			)
		);
		let isoFormattedDate = formattedDate.toISOString().includes('.000Z') ? formattedDate.toISOString().slice(0, -5) : formattedDate.toISOString();
		return isoFormattedDate;
	}
}