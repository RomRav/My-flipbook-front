import { Component, OnInit } from '@angular/core';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';


const $ = eval("jQuery");

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

	public sliderProgress: number;
	public zoomSliderProgress: number;
	public playerOn: any;
	public speedInfo: Object = {};
	public currentZoom: number = 100;
	public xNavCliPos: number = 0;
	public xNavMove: number = 0;
	public nbPage: number = this.flipbook.pages.length;
	public assets: string = "assets/";
	public jpg: string = "-large.jpg";
	public playerSwitch: boolean = true;
	public prevPage: number = 1;

	public isDragging: boolean = false;
	public $slidebar = null;
	public $imgPrev = null;
	public slidebarCursorPage = 0;
	// public slidebarCursorX = 0;
	public slidebarImgX = 0;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService
	) { }

	ngOnInit() {
		// this.navBarAdmin();

		this.$slidebar = $('#set-slide-bar');
		this.$imgPrev = $('.slider-tooltip');
	}

	//////////////////////////////NAVIGATION DES PAGES///////////////////////////////

	// down
	// follow cursor
	// changement de page (en live) sans "corriger" la position du rond
	// up
	// correction de la position du rond



	navSlider(mouseDEv) {
		let _this = this;
		let sideBar = this.sideBarAdmin();
		this.xNavCliPos = mouseDEv.clientX;
		this.xNavMove = this.xNavCliPos - sideBar.sbx;

		_this.flipbook.slidebarCursorX = _this.xNavMove;
		_this.slidebarCursorPage = Math.round(_this.xNavMove / sideBar.sliceSize) + 1
		_this.flipbook.goToPage(_this.slidebarCursorPage, true);

		function move(mouseMEve) {

			_this.flipbook.slideActive = true;
			_this.xNavMove += mouseMEve.clientX - _this.xNavCliPos;
			_this.slidebarCursorPage = Math.round(_this.xNavMove / sideBar.sliceSize) + 1;

			if (_this.slidebarCursorPage < 1) _this.slidebarCursorPage = 1;
			else if (_this.slidebarCursorPage > _this.nbPage) _this.slidebarCursorPage = _this.nbPage;

			_this.flipbook.slidebarCursorX = _this.xNavMove;
			if (_this.flipbook.slidebarCursorX < 0) _this.flipbook.slidebarCursorX = 0;
			else if (_this.flipbook.slidebarCursorX > sideBar.sbw) _this.flipbook.slidebarCursorX = sideBar.sbw;

			
			_this.mouseFollower(mouseMEve);
			_this.flipbook.goToPage(_this.slidebarCursorPage, true);
			_this.xNavCliPos = mouseMEve.clientX;

		}

		function up(mouseMEve) {


			_this.flipbook.slidebarCursorX = Math.round((_this.slidebarCursorPage - 1) * sideBar.sliceSize);
			_this.flipbook.slideActive = false;

			$(window).off('mousemove', move).off('mouseup', up);
		}

		$(window).mousemove(move).mouseup(up);
	}

	sideBarAdmin() {
		let sidBar = {
			'sb': this.$slidebar,
			'sbx': this.$slidebar.offset().left,
			'sbw': this.$slidebar.width(),
			'sliceSize': (this.$slidebar.width() + (this.$slidebar.width() / this.nbPage)) / this.nbPage
		}
		return sidBar
	}


	//Affichage de la prev au hover sur la nav bar
	mouseFollower(mouseHov) {
		let sideBar = this.sideBarAdmin();
	
		this.prevPage = Math.round((mouseHov.clientX - sideBar.sbx) / sideBar.sliceSize) + 1;
		this.slidebarImgX = mouseHov.clientX - sideBar.sbx;
		if ((mouseHov.clientX - sideBar.sbx) <= sideBar.sliceSize) this.slidebarImgX = this.$imgPrev.width() / 2;
		else if (mouseHov.clientX - sideBar.sbx >= (sideBar.sbw - sideBar.sliceSize)) this.slidebarImgX = sideBar.sbw - this.$imgPrev.width() / 2;

	}


	// //Deplacement de la barre de navigation en fonction de la page actuel
	// navBarAdmin() {
	// 	var widthPosBar = $('#set-slide-bar').width()
	// 	var nbPage = this.flipbook.pages.length;
	// 	var stepScale = widthPosBar / nbPage;
	// 	if (this.flipbook.currentPage != 1) {
	// 		this.sliderProgress = stepScale * (this.flipbook.currentPage);

	// 	} else {
	// 		this.sliderProgress = 0;
	// 	}
	// }

	//Definition de la positon de la ball dans la barre de navigation
	// getHandStatus() {
	// 	this.navBarAdmin();
	// 	return (this.sliderProgress - 5) + 'px';
	// }

	//Definition taille courante de la barre de navigation
	// getBarStatus() {
	// 	this.navBarAdmin();
	// 	return this.sliderProgress + 5 + 'px';
	// }


	//PLAYER
	player() {
		if (this.playerSwitch) {
			let page = 1;
			//Récupération de la vitesse de défilement actuel du player
			this.playerSwitch = false;
			this.speedInfo = this.settings.currentPlaySpeed;
			console.log(this.flipbook.currentPage)
			this.playerOn = setInterval(() => {
				if (this.flipbook.currentPage < this.flipbook.pages.length) {
					page = this.flipbook.currentPage;
					page++;
					
					this.flipbook.slidebarCursorX = this.flipbook.refreshNavBarPos(this.flipbook.currentPage*this.flipbook.sliceSize);
					console.log(this.flipbook.slidebarCursorX);
					this.flipbook.goToPage(page, true);
					this.flipbook.linksAdmin();
					this.flipbook.updateScrollView(this.flipbook.currentPage);
				} else {
					clearInterval(this.playerOn);
					this.playerSwitch = true;
				}
			}, this.speedInfo['number']);

		} else if (!this.playerSwitch) {
			clearInterval(this.playerOn);
			this.playerSwitch = true;
		}

	}


	//////////////////////////////GESTION DU VIEWPAN//////////////////////////////

	showPan() {
		this.flipbook.showPane = true;
	}

	//////////////////////////////GESTION DU ZOOM//////////////////////////////

	//Gestion du display css
	zoomVisibilityChanger() {

		if (this.settings.showZoomSelect) {

			this.settings.showZoomSelect = false;
		} else {
			this.settings.showZoomSelect = true;
		}
	}


	//Gestion du changement de la class is-visible
	changeZoomSelectorVis() {
		if (!this.settings.showZoomSelect) {
			this.settings.showZoomSelect = true;
		} else {
			this.settings.showZoomSelect = false;
		}
	}

	//Changement du zoom
	changeZoom(zoom) {
		this.currentZoom = zoom;
		this.flipbook.changeZoom(zoom);
	}

	turnForward() {
		this.flipbook.turnForward();
	}

	turnBackward() {
		this.flipbook.turnBackward();
	}

	zoomIn() {
		this.flipbook.setScale(this.flipbook.scale * 1.5);
	}

	zoomOut() {
		this.flipbook.setScale(this.flipbook.scale * 0.666667);
	}


	//////////////////////////////AFFICHAGE//////////////////////////////
	getFullscreen() {
		var body = document.getElementById('html');
		if (body.requestFullscreen) {

			body.requestFullscreen();
		}
	}


}
