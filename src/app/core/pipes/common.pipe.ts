import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'academicDegree',
})
export class AcademicDegreePipe implements PipeTransform {
  transform(academicDegree: string): string {
    if (academicDegree === 'ts') {
      return 'Tiến sỹ';
    } else if (academicDegree === 'th.s') {
      return 'Thạc sỹ';
    } else {
      return '';
    }
  }
}
