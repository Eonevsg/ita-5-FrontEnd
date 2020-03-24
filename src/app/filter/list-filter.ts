import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "search"
})
export class SearchPipe implements PipeTransform {
  public transform(values: any[], keys: string, term: string) {
      console.log(keys);
      console.log(term);
      if(!values || !term){
          return values;
      }
    return values.filter(item => item.person.name.indexOf(term) !== -1);
  }
}
