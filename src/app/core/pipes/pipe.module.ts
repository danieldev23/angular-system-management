import { NgModule } from '@angular/core';
import { AcademicDegreePipe } from './common.pipe';

@NgModule({
	imports: [],
	declarations: [
		AcademicDegreePipe
	],
    exports: [
		AcademicDegreePipe
	]
})
export class MyPipeModule {
	static forRoot(): any {
		return {
			ngModule: MyPipeModule,
			providers: []
		};
	}
}
