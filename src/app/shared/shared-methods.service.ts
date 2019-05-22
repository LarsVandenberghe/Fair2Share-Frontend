import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor() { }

  formatHttpRequestError(json_str): string[] {
    var json = JSON.parse(json_str);
    var out: string[] = [];

    if (typeof(json) === "object"){
      out = new Array(Object.keys(json).length);
      for (var key in json) {
        out.push(`${key}: ${json[key]}`);
      }
    } else {
      out.push(json);
    }
    return out;
  }
}
