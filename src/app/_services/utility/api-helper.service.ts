import { Injectable } from '@angular/core';
import { IDictionary } from 'src/app/_models/idictionary';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor() { }

  public parseUrlFragmentToQueryParameterDict(fragment: string): IDictionary {
    const dict = {};
    const params = fragment.split('&');
    $.each(params, (i, e) => {
      if (e.indexOf('=') > -1) {
        const s = e.split('=');
        dict[s[0]] = s[1];
      }
    });

    return dict;
  }
}
