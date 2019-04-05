export const environment = {
	production: true,
	oauthEndpoint: 'http://api.localhost/oauth',
	apiEndpoint: 'http://api.localhost/api',
	oauthCookiesName: {
		google: 'googleAuthUID',
		twitch: 'twitchAuthUID'
	},
	mailPanelRefreshTime: 30000,
	twitchPanelRefreshTime: 30000,
	youtubePlayerAPIEndpoint: 'https://www.youtube.com/iframe_api',
	twitchPlayerAPIEndpoint: 'https://player.twitch.tv/js/embed/v1.js',
	twitchChatWSEndpoint: 'ws://irc-ws.chat.twitch.tv:80'
};
// sudo ng build --prod --outputPath /var/www/html/
