import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StringHelperService {

	constructor() { }

	decodeEntities(encodedString) {
		const translateEntity = /&(nbsp|amp|quot|lt|gt|#39);/g;
		const translate = {
			nbsp: ' ',
			amp: '&',
			quot: '"',
			lt: '<',
			gt: '>',
			'#39': '\''
		};
		return encodedString.replace(translateEntity, (match, entity) => {
			return translate[entity];
		}).replace(/&#(\d+);/gi, (match, numStr) => {
			const num = parseInt(numStr, 10);
			return String.fromCharCode(num);
		});
	}
}
