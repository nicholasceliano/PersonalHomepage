import { GmailEmail } from './gmail-email';

export class GmailThread {
	id: string;
	historyId: string;
	messages: GmailEmail[];
}
