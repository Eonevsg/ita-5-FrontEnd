import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language : string = "lt";
  constructor() { }
  getLanguage(){
    return this.language;
  }
  setLanguage(lang: string){
    this.language = lang;
  }
}
