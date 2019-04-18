import { Pipe, PipeTransform } from '@angular/core';
import { StringHelperService } from '../_services/utility/string-helper.service';

@Pipe({
	name: 'htmlEntitiyDecode'
})
export class HtmlEntitiyDecodePipe implements PipeTransform {
	constructor(private stringHelperService: StringHelperService) { }
	transform(value: any): any {
		return this.stringHelperService.decodeEntities(value);
	}
}
