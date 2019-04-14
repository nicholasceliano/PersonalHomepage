export const environment = {
	production: true,
	appTitle: 'Personal Homepage',
	oauthEndpoint: 'http://api.localhost/oauth',
	apiEndpoint: 'http://api.localhost/api',
	oauthCookiesName: {
		google: 'googleAuthUID',
		twitch: 'twitchAuthUID'
	},
	mailPanelRefreshTime: 30000,
	twitchPanelRefreshTime: 30000,
	defaultRefreshTime: 900000, // 15 mins
	youtubePlayerAPIEndpoint: 'https://www.youtube.com/iframe_api',
	twitchPlayerAPIEndpoint: 'https://player.twitch.tv/js/embed/v1.js',
	twitchChatWSEndpoint: 'wss://irc-ws.chat.twitch.tv:443'
};
// sudo ng build --prod --outputPath /var/www/html/
