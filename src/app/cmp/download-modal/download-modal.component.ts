import { Component, OnInit } from '@angular/core';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';

@Component({
	selector: 'app-download-modal',
	templateUrl: './download-modal.component.html',
	styleUrls: ['./download-modal.component.css']
})
export class DownloadModalComponent implements OnInit {

	public isShowDlModal: boolean;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public download: DownloaderService
	) { }

	ngOnInit() {
	}

}
