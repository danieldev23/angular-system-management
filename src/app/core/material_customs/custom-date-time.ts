import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { TimeService } from '../services/time.service';

export const customStandardDateTimeFormatConfig = () : NgxMatDateFormats => {
	const CUSTOM_DATE_FORMAT = {
		parse: {
			dateInput: 'YYYY-MM-DD[T]HH:mm:ss',
		},
		display: {
			dateInput: 'YYYY-MM-DD[T]HH:mm:ss',
			monthYearLabel: 'MMM YYYY',
			dateA11yLabel: 'LL',
			monthYearA11yLabel: 'MMMM YYYY',
		},
	};

	return CUSTOM_DATE_FORMAT;
};
export const customOnlyDateFormatConfig = (timeService: TimeService) : NgxMatDateFormats => {
	var localeFormat = timeService.getDateFormatByUserUnitForDatePicker();
	const CUSTOM_DATE_FORMAT: NgxMatDateFormats = {
		parse: {
			dateInput: 'l, LTS'
		},
		display: {
			dateInput: localeFormat,
			monthYearLabel: 'MMM YYYY',
			dateA11yLabel: 'LL',
			monthYearA11yLabel: 'MMMM YYYY'
		}
	};
	return CUSTOM_DATE_FORMAT;
};
export const customDateTimeFormatConfig = (timeService: TimeService) : NgxMatDateFormats => {
	var localeFormat = timeService.getDateFormatByUserUnitForDatePicker() + ' HH:mm:00';
	const CUSTOM_DATE_FORMAT: NgxMatDateFormats = {
		parse: {
			dateInput: 'l, LTS'
		},
		display: {
			dateInput: localeFormat,
			monthYearLabel: 'MMM YYYY',
			dateA11yLabel: 'LL',
			monthYearA11yLabel: 'MMMM YYYY'
		}
	};
	return CUSTOM_DATE_FORMAT;
};
export const customDateTimeFormatConfigWithDayWeek = (timeService: TimeService) : NgxMatDateFormats => {
	var localeFormat = timeService.getDateFormatByUserUnitForDatePicker();
	const CUSTOM_DATE_FORMAT: NgxMatDateFormats = {
		parse: {
			dateInput: 'l, LTS'
		},
		display: {
			dateInput: 'ddd, '+ localeFormat,
			monthYearLabel: 'MMM YYYY',
			dateA11yLabel: 'LL',
			monthYearA11yLabel: 'MMMM YYYY'
		}
	};
	return CUSTOM_DATE_FORMAT;
};