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
        item.extra.status.toLowerCase().indexOf(filters.status.toLowerCase()) >=
          0 &&
        item.extra.dateTime.indexOf(filters.dateTime) >= 0 &&
        item.name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0 &&
        item.surname.toLowerCase().indexOf(filters.surname.toLowerCase()) >=
          0 &&
        item.uni.toLowerCase().indexOf(filters.uni.toLowerCase()) >= 0
      );
    });
  }
}
