import { HtmlEntitiyDecodePipe } from './html-entitiy-decode.pipe';
import { StringHelperService } from '../_services/utility/string-helper.service';

describe('HtmlEntitiyDecodePipe', () => {
	it('create an instance', () => {
		const pipe = new HtmlEntitiyDecodePipe(new StringHelperService());
		expect(pipe).toBeTruthy();
	});
});
