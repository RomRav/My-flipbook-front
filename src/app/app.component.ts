import { Component, HostListener } from '@angular/core';
import { DownloaderService } from './svc/downloader.service';
import { FlipbookService } from './svc/flipbook.service';
import { SettingsService } from './svc/settings.service';
import { UserService } from './svc/user.service';

const $ = eval("jQuery");
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'flipbook';


	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService,
		public user: UserService
	) {
		this.detectDevice();
		window.addEventListener("orientationchange", () => {
			// console.log(window.matchMedia("(orientation: portrait)"));
			if (window.matchMedia("(orientation: portrait)").matches) {
				console.log(' portrait');
			} else {
				console.log('paysage')
			}
		});
	}



	bodyClickAcion() {

		if (this.settings.showSettings) {
			this.settings.speedSelectorVis = false;
			this.settings.showSettings = false;
		}
		if (this.settings.showZoomSelect) {
			this.settings.showZoomSelect = false;
		}
	}

	nextPage() {
		let fbk = this.flipbook,
			page = this.flipbook.currentPage + 1;

		if (fbk.currentView === fbk.VIEW_FLIP && page % 2 === 1) page++;

		this.flipbook.goToPage(page, true);
	}

	previousPage() {
		let fbk = this.flipbook,
			page = this.flipbook.currentPage - 1;

		if (fbk.currentView === fbk.VIEW_FLIP && page % 2 === 0) page--;

		this.flipbook.goToPage(page, true);
	}

	detectDevice() {
		document.body.setAttribute('device',
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
				'mobile' : 'desktop'
		);


	}
}
