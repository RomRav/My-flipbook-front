import { Component, OnInit, HostListener } from '@angular/core';

import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';

const $ = eval("jQuery");
const
	X = 0,
	Y = 1;

@Component({
	selector: 'app-slide-view',
	templateUrl: './slide-view.component.html',
	styleUrls: ['./slide-view.component.css']
})
export class SlideViewComponent implements OnInit
{
	public position: Array<number> = [0, 0];
	public yClickPos: number;
	public xClickPos: number;
	public currentPage: number;
	public assets: string;
	public jpg: string;
	public debug;

	public currentScale: number = 1;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService
	) {
		this.assets = "assets/";
		this.jpg = "-large.jpg";
		
	}

	ngOnInit() {
		
	}
	
	@HostListener('tap', ['$event']) 
	onTap(event) 
	{
		this.flipbook.toggleUI() ;
	}

	@HostListener('scroll', ['$event']) 
	 onScroll(event) 
	 {
		 console.log('h');
	}

	@HostListener('swipe', ['$event'])
	onSwipe(e)
	{
		if (e.pointerType !== 'touch') return;

		switch (e.direction) {
			case 2: // left
				this.flipbook.goToPage(this.flipbook.currentPage + 1);
				break;
			case 4: // right
				this.flipbook.goToPage(this.flipbook.currentPage - 1);
				break;
			case 8: // top
				break;
			case 16: // bottom
				break;
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

	//Deplacement de la view
	viewDragDrop(downEvent)
	{
	
		this.yClickPos = downEvent.clientY;
		this.xClickPos = downEvent.clientX;
		$(window).mousemove((moveEvent) => {
			this.position[X] += moveEvent.clientX - this.xClickPos;
			this.position[Y] += moveEvent.clientY - this.yClickPos;
			this.yClickPos = moveEvent.clientY;
			this.xClickPos = moveEvent.clientX;
			$('.fbk-document').css({
				top: this.position[Y] + 'px',
				left: this.position[X] + 'px'
			});
		});
		$(window).mouseup(() => {
			$(window).off('mousemove mouseup');
		});
	}

}
