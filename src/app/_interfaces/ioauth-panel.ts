export interface IOAuthPanel {
	signInUrl: string;
	panelAuthenticated: boolean;

	authenticate();
}
