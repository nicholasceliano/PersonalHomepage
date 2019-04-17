import { Directive, ElementRef, OnInit } from '@angular/core';
import { LocalStorageService } from '../_services/utility/local-storage.service';
import { environment } from 'src/environments/environment';

@Directive({
	selector: '[appThemeItem]'
})
export class ThemeItemDirective implements OnInit {

	constructor(
		private elementRef: ElementRef,
		private localStorageService: LocalStorageService
	) { }

	private darkThemeClass = 'dark-theme';
	private settings;

	ngOnInit() {
		const el: HTMLElement = this.elementRef.nativeElement;

		this.settings = this.localStorageService.get(environment.localStorage.dashboardSettings);
		this.setDarkTheme(el);

		this.localStorageService.watchStorage().subscribe((localStorageItem) => {
			this.settings = localStorageItem[environment.localStorage.dashboardSettings];
			this.setDarkTheme(el);
		});
	}

	private setDarkTheme(el: HTMLElement) {
		if (this.settings && this.settings.swDarkTheme) {
			document.body.classList.add(this.darkThemeClass);
			el.classList.add(this.darkThemeClass);
		} else {
			document.body.classList.remove(this.darkThemeClass);
			el.classList.remove(this.darkThemeClass);
		}
	}
}
