import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ScrollViewComponent } from './cmp/scroll-view/scroll-view.component';
import { SettingsMenuComponent } from './cmp/settings-menu/settings-menu.component';
import { DownloadModalComponent } from './cmp/download-modal/download-modal.component';
import { ToolbarComponent } from './cmp/toolbar/toolbar.component';
import { FlipViewComponent } from './cmp/flip-view/flip-view.component';
import { SlideViewComponent } from './cmp/slide-view/slide-view.component';
import { TitleBarComponent } from './cmp/titlebar/titlebar.component';
import { NavPaneComponent } from './cmp/nav-pane/nav-pane.component';
import { AuthComponent } from './cmp/auth/auth.component';

import { FlipbookService } from './svc/flipbook.service';
import { SettingsService } from './svc/settings.service';
import { DownloaderService } from './svc/downloader.service';
import { UserService } from './svc/user.service';
import { BooksAdminService } from './svc/books-admin.service';

import { Page } from './ett/page';
import { Link } from './ett/link';
import { Crop } from './ett/crop';
import { FlipbookViewComponent } from './cmp/flipbook-view/flipbook-view.component';
import { InscriptionComponent } from './cmp/inscription/inscription.component';
import { UserData } from './ett/userData';
import { BookListComponent } from './cmp/book-list/book-list.component';




export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		// override hammerjs default configuration
		'swipe': { direction: Hammer.DIRECTION_ALL }
	}
}

const appRoutes: Routes = [
	{ path: 'flipbookview', component: FlipbookViewComponent },
	{ path: 'auth', component: AuthComponent },
	{ path: 'inscription', component: InscriptionComponent },
	{ path: 'booklist', component: BookListComponent },
	{ path: '', component: AuthComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		ScrollViewComponent,
		SettingsMenuComponent,
		DownloadModalComponent,
		ToolbarComponent,
		FlipViewComponent,
		SlideViewComponent,
		TitleBarComponent,
		NavPaneComponent,
		AuthComponent,
		FlipbookViewComponent,
		InscriptionComponent,
		BookListComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RouterModule.forRoot(appRoutes)
	],
	providers: [
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: MyHammerConfig
		},
		FlipbookService,
		SettingsService,
		DownloaderService,
		UserService,
		BooksAdminService,
		Page,
		Link,
		Crop,
		UserData
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
