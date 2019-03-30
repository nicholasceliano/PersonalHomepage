import { GmailEmail } from '../_models/gmail-email';

export class GmailThread {
	id: string;
	historyId: string;
	messages: GmailEmail[];
}
