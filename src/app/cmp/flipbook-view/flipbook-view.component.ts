import { Component, HostListener } from '@angular/core';
import { SettingsService } from 'src/app/svc/settings.service';
import { UserService } from 'src/app/svc/user.service';
import { FlipbookService } from 'src/app/svc/flipbook.service';


const $ = eval("jQuery");

@Component({
  selector: 'app-flipbook-view',
  templateUrl: './flipbook-view.component.html',
  styleUrls: ['./flipbook-view.component.css']
})
export class FlipbookViewComponent {
  title = 'flipbook';


	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
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
