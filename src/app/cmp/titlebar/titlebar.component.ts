import { Component, OnInit } from '@angular/core';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';
import { UserService } from 'src/app/svc/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-titlebar',
	templateUrl: './titlebar.component.html',
	styleUrls: ['./titlebar.component.css']
})
export class TitleBarComponent implements OnInit {

	public bookName: string;
	public nbrPage: number;
	public dateCreation: Date;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService,
		public activateRoute: ActivatedRoute,
		public user: UserService
	) {
		this.bookName = this.flipbook.name;
		this.nbrPage = this.flipbook.pages.length;
		this.dateCreation = this.flipbook.dateCreation;
	}

	ngOnInit() { }

	//Gestion de l'affichage des settings
	showSettings() {
		if (this.settings.showSettings) {
			this.settings.showSettings = false;
		} else {
			this.settings.showSettings = true;
		}
	}

	//Gestion de l'affichage du panneau de nav
	toggleNagivationPane() {
		this.flipbook.showPane = !this.flipbook.showPane;
	}

	callGetList(item) {
		this.user.getBookList(item);
	}

}
