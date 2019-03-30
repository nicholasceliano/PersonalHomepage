export const environment = {
	production: true,
	oauthEndpoint: 'http://localhost:3333/oauth',
	apiEndpoint: 'http://localhost:3333/api',
	oauthCookiesName: {
		google: 'googleAuthUID',
		twitch: 'twitchAuthUID'
	},
	mailPanelRefreshTime: 30000,
	twitchPanelRefreshTime: 30000,
	youtubePlayerAPIEndpoint: 'https://www.youtube.com/iframe_api',
};
