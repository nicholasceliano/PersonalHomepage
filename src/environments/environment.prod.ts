export const environment = {
	production: true,
	appTitle: 'Personal Homepage',
	oauthEndpoint: 'https://api.nick.me/oauth',
	apiEndpoint: 'https://api.nick.me/api',
	oauthCookiesName: {
		google: 'googleAuthUID',
		twitch: 'twitchAuthUID'
	},
	localStorage: {
		dashboardSettings: 'dashboardSettings'
	},
	mailPanelRefreshTime: 30000,
	twitchPanelRefreshTime: 30000,
	defaultRefreshTime: 600000, // 10 mins
	youtubePlayerAPIEndpoint: 'https://www.youtube.com/iframe_api',
	twitchPlayerAPIEndpoint: 'https://player.twitch.tv/js/embed/v1.js',
	twitchChatWSEndpoint: 'wss://irc-ws.chat.twitch.tv:443'
};
// sudo ng build --prod --outputPath /var/www/html/
