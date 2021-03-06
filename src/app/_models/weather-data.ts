export class WeatherData {
	public date: number;
	public humidity: number;
	public tempCurr: number;
	public tempMin: number;
	public tempMax: number;
	public main: string;
	public desc: string;
	public icon: string;
	public rain3h: number;
	public snow3h: number;
	public windSpeed: number;
	public windDir: string;
	public forecast: WeatherData[] | undefined;
}
