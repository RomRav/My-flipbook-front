import { Component, OnInit } from '@angular/core';
import { DownloaderService } from 'src/app/svc/downloader.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { Page } from 'src/app/ett/page';
import * as Perfectscrollbar from 'src/vendor/perfect-scrollbar';

const $ = eval("jQuery");


@Component({
  selector: 'app-nav-pane',
  templateUrl: './nav-pane.component.html',
  styleUrls: ['./nav-pane.component.css']
})
export class NavPaneComponent implements OnInit {

	public pairePagesTable: Array<Page>;
	public oddPagesTable: Array<Page>;
	public spanTableStatus: Array<boolean>;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService
	) {}

	ngOnInit() {

		//GESTION DES VIEWS
		this.pairePagesTable = [];
		this.oddPagesTable = [];
		this.spanTableStatus = [];

		this.flipbook.pages.forEach((page, index) => {
			if (page.number != this.flipbook.pages.length) {

				if (page.number % 2 == 0) {
					this.pairePagesTable.push(page);
				} else if (page.number == 1) {
				} else {
					this.oddPagesTable.push(page);
				}
			}
		})
		// console.log(this.pairePagesTable);
		// console.log(this.oddPagesTable);
		let container = document.querySelector('.panel-content');
		new Perfectscrollbar(container);
		this.isActive();
	}

	hiddPan() {
		this.flipbook.showPane = false;
		this.isActive();
	}


	///GESTION DU CHANGEMENT DES PAGES
	public isActive() {
		this.spanTableStatus = [];

		for (var i: number = 0; i < this.flipbook.pages.length; i++) {
			if (i == this.flipbook.currentPage - 1) {
				this.spanTableStatus.push(true);
			} else {
				this.spanTableStatus.push(false);
			}
		}
		// console.log(this.spanTableStatus);
	}

	///GESTION DE L'AFFICHAGE DE LA PAGE CLIQUER
	showSelectedPage(nbPage) {
		this.isActive();
		this.flipbook.goToPage(nbPage, true);
		this.flipbook.updateScrollView(nbPage);
	}
}
