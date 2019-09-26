import { Component, OnInit, HostListener } from '@angular/core';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';
import * as PerfectScrollbar from 'src/vendor/perfect-scrollbar';

const $ = eval("jQuery");

@Component({
	selector: 'app-scroll-view',
	templateUrl: './scroll-view.component.html',
	styleUrls: ['./scroll-view.component.css']
})

export class ScrollViewComponent implements OnInit {

	public currentPageId;
	public numPage: number = 1;
	public prevScrollPos = 0;
	public debug;
	public currentScale: number = 1;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService
	) { }

	ngOnInit() {
		if (this.flipbook.devise == "desktop") {
			new PerfectScrollbar(document.querySelector('app-scroll-view'));
		}

		$('app-scroll-view').css('touch-action', "");
		$('app-scroll-view').css('overflow', "scroll !important");
	}


	@HostListener('tap', ['$event'])
	onTap(event) {

		this.flipbook.toggleUI();
	}

	//////////////////////////////SCROLL//////////////////////////////

	//Gestion des pages

	@HostListener('scroll', ['$event'])
	scrollHandler(event) {
		console.log(event)
		let $currentPageTopPos = $(`#page${this.flipbook.currentPage}`).offset().top + $(`#page${this.flipbook.currentPage}`).height();
		let scrollPos = event.srcElement.scrollTop;
		if (scrollPos > this.prevScrollPos) {
			this.prevScrollPos = scrollPos;

			if ($currentPageTopPos - window.innerHeight / 2 < 0) {
				this.flipbook.goToPage(this.flipbook.currentPage + 1);
			}
		} else if (scrollPos < this.prevScrollPos) {

			this.prevScrollPos = scrollPos;
			if ($currentPageTopPos - window.innerHeight / 2 > $(`#page${this.flipbook.currentPage}`).height()) {
				this.flipbook.goToPage(this.flipbook.currentPage - 1);
			}
		}
	}

	@HostListener('pinchstart', ['$event'])
	onPinchStart(e)
	{	
		this.currentScale = this.flipbook.scale ;
	}

	@HostListener('pinch', ['$event'])
	onPinch(e)
	{	
		
		this.flipbook.setScale(this.currentScale * e.scale);
		this.debug = e.scale;
		
	}

}
