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
      let name = item.name.concat(" ", item.surname);
      return (
        item.extra.status.toLowerCase().indexOf(filters.status.toLowerCase()) >=
          0 &&
        item.extra.dateTime.indexOf(filters.dateTime) >= 0 &&
        name.toLowerCase().indexOf(filters.name.toLowerCase()) >= 0 &&
        item.uni.toLowerCase().indexOf(filters.uni.toLowerCase()) >= 0 &&
        item.extra.applicationValuation
          .toLowerCase()
          .indexOf(filters.applicationValuation.toLowerCase()) >= 0 &&
        item.extra.interviewValuation
          .toLowerCase()
          .indexOf(filters.interviewValuation.toLowerCase()) >= 0 &&
        item.extra.notes.toLowerCase().indexOf(filters.notes.toLowerCase()) >= 0
      );
    });
  }
}
