import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: Array<any>, searchQuery: string = ''): any {
    if (searchQuery === '') {
      return items;
    }
    return items.filter(item => {
      return (
        item.name.first.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        ||
        item.name.last.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    });
  }

}
