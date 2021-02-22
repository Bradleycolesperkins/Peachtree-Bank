import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a.dates.valueDate < b.dates.valueDate) {
        return 1;
      } else if (a.dates.valueDate > b.dates.valueDate) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
