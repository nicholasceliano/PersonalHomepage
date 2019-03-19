import { Injectable } from '@angular/core';
import { IDictionary } from 'src/app/_models/idictionary';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor() { }

  public parseUrlFragmentToQueryParameterDict(fragment: string): IDictionary {
    var dict = {};
    var params = fragment.split('&');
    $.each(params, (i,e) => {
      if(e.indexOf("=") > -1) {
        var s = e.split('=')
        dict[s[0]] = s[1];
      }
    });

    return dict;
  }
}