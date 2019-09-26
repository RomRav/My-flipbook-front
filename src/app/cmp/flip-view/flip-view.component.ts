import { Component, OnInit } from '@angular/core';
import { FlipbookService } from 'src/app/svc/flipbook.service';
import { SettingsService } from 'src/app/svc/settings.service';
import { DownloaderService } from 'src/app/svc/downloader.service';
import { echo } from 'src/util';

const $ = eval("jQuery");

@Component({
	selector: 'app-flip-view',
	templateUrl: './flip-view.component.html',
	styleUrls: ['./flip-view.component.css']
})
export class FlipViewComponent implements OnInit {

	public prevPage = 1;
	public currentPage = 1;

	constructor(
		public flipbook: FlipbookService,
		public settings: SettingsService,
		public downloader: DownloaderService
	) { }

	ngOnInit() {
		let _this = this,
			$fbk = $('#ThreeDFlipbook'),
			flipbook = $fbk.FlipBook({
				propertiesCallback: props => {
					props.cssLayersLoader = (n, then) => {
						let page = _this.flipbook.pages[n],
							links = page.links;

						if (!links) return;

						then([
							{
								html: _this.createLinksHtml(links),
                                /* css : '.test { background:red }',
                                js : ctn => ({
                                    hide() {},
                                    hidden() {},
                                    show() {},
                                    shown() {},
                                    dispose() {}
                                }) */
							}
						]);
					};

					return props;
				},
				pageCallback: n => ({
					type: 'image',
					src: 'assets/' + (n + 1) + '-large.jpg',
					interactive: true

				}),
				pages: this.flipbook.pages.length,
				template: {
					html: 'assets/3d-flipbook/book-view.html',
					styles: [
						'assets/3d-flipbook/book-view.css',
						'assets/3d-flipbook/flipbook-link.css'
					],
					links: []
				},

				ready: () => {
					let fbkWindow = $fbk.find('iframe').get(0).contentWindow,
						settings = flipbook.ctrl.p,
						actions = flipbook.ctrl.actions,
						watcher = flipbook.ctrl.bookWatcher;

					_this.flipbook.bookWindow = fbkWindow;

					settings.scale.min = this.flipbook.minScale;
					settings.scale.max = this.flipbook.maxScale;

					fbkWindow.document.body.setAttribute('fbk-show-links', _this.flipbook.showLinks);

					$(fbkWindow).on('mousewheel', function () {
						setTimeout(function () {
							_this.flipbook.setScale(watcher.scale);
						}, 1);
					});

					$(fbkWindow.document.body).delegate('.fbk-link', 'click', function (ce) {
						let url = this.getAttribute('data-url');
						if (url) return _this.flipbook.openLink({ url });

						let page = this.getAttribute('data-page');
						if (page) return _this.flipbook.openLink({ page });
					});

					$(fbkWindow.document.body).click('body', function (ce) {
						_this.bodyClickAcion()
					});


					setInterval(() => {
						if (this.flipbook.currentView == 1) {
						
							this.currentPage = flipbook.ctrl.viewState.inpPage.value;

							if (this.prevPage != this.currentPage) {
								_this.refreshNavBarPos(this.currentPage);
								this.prevPage = this.currentPage;
							}
						}
					}, 500);
				}
			});

		eval('window.FLIP = flipbook');

		this.flipbook.book = flipbook;
	}

	createLinksHtml(links) {
		let html = '<div class="fbk-links">';
		for (let link of links) {
			html += '<div class="fbk-link" data-' + (link.url ? 'url' : 'page') + '="' + (link.url ? link.url : link.page) + '"\
                style="left:' + link.coords.x + '%;top:' + link.coords.y + '%;width:' + link.coords.w + '%;height:' + link.coords.h + '%;"\
            ></div>' ;
		}
		html += '</div>';

		return html;
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

	refreshNavBarPos(currentPage) {
		this.flipbook.goToPage(currentPage);

	}

}
