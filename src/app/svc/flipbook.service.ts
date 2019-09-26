import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Page } from '../ett/page';
import { Link } from '../ett/link';
import { echo } from 'src/util';

const $ = eval("jQuery");

@Injectable({
	providedIn: 'root'
})
export class FlipbookService {
	static COVER_FLEXIBLE: number = 1;
	static COVER_RIGID: number = 2;

	//////////////////////////////////////////////////////////////////////////////////////////////
//Variables definisant les vues
	public VIEW_FLIP: number = 1;
	public VIEW_SLIDE: number = 2;
	public VIEW_SCROLL: number = 3;

	//Variable actuelle, initialisé au lancement de l'application par la vue flip
	public currentView: number = this.VIEW_FLIP;

	public linksTable: Array<Link>;
	public minScale: number = 0.5;
	public maxScale: number = 4;
	public scale: number = 1;
	public zoom: number = this.scale * 100;
	public showUI: boolean = true ;
	public showPane: boolean = false;
	public showLinks: boolean = true;
	public name: string;
	public description: string;
	public dateCreation: Date;
	public currentPage: number = 1;
	public sliceSize: number;
	public slideActive: boolean = false;
	public devise;
	public slidebarCursorX = 0;


	public dimension: {
		w: number,
		h: number
	};

	public zoomDimension: {
		w: number,
		h: number
	};

	public aspectRatio: number;

	public cover: {
		assetName: string,
		type: number
	};

	public pages: Array<Page>;
	public book = null;
	public bookWindow = null;

	///////////////////////////////////////////////////////////////////////////////////////////////

	constructor(private page: Page, private http: HttpClient) {

		let flipConfig = this.loadConfig();

		this.name = flipConfig.name;

		this.description = flipConfig.description;

		this.dateCreation = this.dateConst(flipConfig.dateCreation);

		this.dimension = {
			w: flipConfig.dims.w,
			h: flipConfig.dims.h
		};

		this.zoomDimension = {
			w: flipConfig.dims.w,
			h: flipConfig.dims.h
		};
		this.cover = {
			assetName: flipConfig.cover.assetPreviewName,
			type: FlipbookService['COVER_' + flipConfig.cover.type.toUpperCase()]
		};

		this.pages = flipConfig.pages as Array<Page>;

		this.aspectRatio = this.dimension.w / this.dimension.h;
		setTimeout(() => {
			this.sliceSize = $('#set-slide-bar').width() / this.pages.length;
			this.devise = document.querySelector('body').attributes[1].value;
			this.currentView = (this.devise != "mobile") ? this.VIEW_FLIP : this.VIEW_SLIDE
		
			this.switchView(this.currentView);
		}, 0);

	}

	///////////////////////////////////////////////////////////////////////////////////////////////



	public loadConfig() {
		var http = new XMLHttpRequest(),
			data;

		http.onreadystatechange = function () {
			if (http.readyState !== XMLHttpRequest.DONE) return;
			data = http.responseText;
		};

		http.open("GET", 'assets/flipbook.json', false);
		http.send();

		return JSON.parse(data);
	}

	public dateConst(dateJson) {
		var date: Date = new Date(dateJson);
		return date;
	}
	
	public toggleUI()
	{
		this.showUI = !this.showUI ;
	}

	public changeZoom(zoom) {
		let pageHeight = this.dimension.h;
		this.zoomDimension.h = pageHeight * (zoom / 100);
		// console.log(this.zoomDimension.h);
		// console.log(this.dimension.h);

		this.setScale(zoom / 100);
	}
	//Fonction de gestion du changement de vue avec en paramétre la nouvelle vue
	public switchView(view: number) {
		// console.log(this.currentPage);
		// console.log($('app-scroll-view').scrollTop())
		this.currentView = view;
		setTimeout(() => {
			this.updateScrollView(this.currentPage);
			this.refreshNavBarPos(this.currentPage * this.sliceSize + $('#slider-nav-progress').width());

		}, 0);
	}

	public getCurrentViewName(): string {
		return ['flip', 'diapo', 'scroll'][this.currentView - 1];
	}

	//Création du tableau de links par page
	public linksAdmin() {
		this.linksTable = [];
		if (this.pages[this.currentPage - 1].links) {
			this.linksTable = this.pages[this.currentPage - 1].links
		}
	}

	//////////////////////////////////////////

	public turnForward() {
		this.book.ctrl.cmdForward();
	}

	public turnBackward() {
		this.book.ctrl.cmdBackward();
	}

	public setScale(scale, update = true) {
		let prevScale = this.scale;
		if (scale < this.minScale) scale = this.minScale;
		else if (scale > this.maxScale) scale = this.maxScale;
		this.scale = scale = Math.round(scale * 100) / 100;
		if (scale === prevScale) return;
		if (update) {
			scale -= 0.1; // margins

			this.book.ctrl.setBookZoom(scale); // Updates data
			this.book.ctrl.bookWatcher.scale = scale; // Updates view
			this.zoomDimension.h = this.dimension.h * (scale);
			this.zoom = Math.floor(this.scale * 100);//Updates toolbar info
		}
	}

	public getLinkStyle(link) {
		return link ? {
			width: link.coords.w + '%',
			height: link.coords.h + '%',
			top: link.coords.y + '%',
			left: link.coords.x + '%'
		} : {};
	}

	public getShowLinks() {
		return this.showLinks
	}

	public setLinksVisibility(state) {
		this.showLinks = state;

		this.bookWindow.document.body.setAttribute('fbk-show-links', state);
	}

	public openLink(link) {
		if (link.url) window.open(link.url, '_blank');
		else this.goToPage(link.page, true);
	}

	public goToPage(page, forceUpdateAll = false) {
		page = parseInt(page);
		if (page < 1) page = 1;
		else if (page > this.pages.length) page = this.pages.length;

		if (this.currentPage === page) return;
		this.currentPage = page;

		if (this.currentView !== this.VIEW_FLIP || forceUpdateAll) {
			this.book.ctrl.inpPage(null, this.currentPage);
			this.slidebarCursorX = this.refreshNavBarPos(this.currentPage*this.sliceSize);
			
		}

		if (this.currentView !== this.VIEW_SLIDE || forceUpdateAll) {
			this.slidebarCursorX = this.refreshNavBarPos(this.currentPage*this.sliceSize);
		}

		if (this.currentView !== this.VIEW_SCROLL || forceUpdateAll) {
			this.updateScrollView(this.currentPage);
			this.slidebarCursorX = this.refreshNavBarPos(this.currentPage*this.sliceSize);
		}
	}

	refreshNavBarPos(currentBarPos) {
		if (this.currentPage == 1) {
			currentBarPos = 0;
		}

		return currentBarPos;



	}

	public updateScrollView(page) {
		let idPage = document.getElementById(`page${page}`);
		$('app-scroll-view').animate({ scrollTop: idPage.parentElement.offsetTop }, 1);
	}





}
