import { Component, OnInit } from '@angular/core';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';
import * as $ from 'jquery';

@Component({
	selector: 'app-settings-menu',
	templateUrl: './settings-menu.component.html',
	styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit {

	public isShowSettingView: boolean;


	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService
	) { }

	ngOnInit() {
	}


	//Changement de la vitesse du player
	changePlaySpeed(speed, lib) {
		let speedChanger: Object = {
			libelle: lib,
			number: speed
		};
		this.settings.currentPlaySpeed = speedChanger;
	}

	//Affichage des liens
	toggleLinksVisibility()
	{
		this.flipbook.setLinksVisibility(!this.flipbook.showLinks) ;
	}

	//Affichage du selecteur de vitesses de défilement des pages
	showspeedSelector() {
	
		if (!this.settings.speedSelectorVis) {
			this.settings.speedSelectorVis = true;
		} else {
			this.settings.speedSelectorVis = false;
		}
	}

	//Modification de la vitesse de défilement actuelle
	speedSelector(time) {
		this.settings.currentPlaySpeed = {
			libelle: time.libelle,
			number: time.number
		}
		this.settings.speedSelectorVis = false;
	}

}
