import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  public transform(values: any[], filters: any) {
    if (!values || !filters) {
      return values;
    }

    return values.filter(item => {
      return (
        item.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0 &&
        item.surname.toLowerCase().indexOf(filters.surname.toLowerCase()) >= 0 &&
        item.uni.toLowerCase().indexOf(filters.uni.toLowerCase()) >= 0
      );
    });
  }
}
