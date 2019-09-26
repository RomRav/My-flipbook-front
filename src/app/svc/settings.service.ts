import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
	providedIn: 'root'
})
export class SettingsService
{
	public showZoomSelect: boolean = false;
	public showSettings: boolean = false;
	public alwaysShowLinks: boolean = false;
	public darkMode: boolean = true ;
	public speedSelectorVis: boolean = false;

	public playSpeed: Array<Object> = [
		{
			libelle: "2 sec",
			number: 2000
		},
		{
			libelle: "5 sec",
			number: 5000
		},
		{
			libelle: "10 sec",
			number: 10000
		},
		{
			libelle: "20 sec",
			number: 20000
		}
	];

	public currentPlaySpeed: Object = {
		libelle: "10 sec",
		number: 10000
	};

	public zoomLevel: Array<number> = [
		400,
		300,
		200,
		150,
		100,
		75,
		50
	];

	constructor()
	{
		this.load() ;
		this.render() ;
	}

	switchTheme()
	{
		this.darkMode = !this.darkMode ;
		this.render() ;

		this.save() ;
	}

	render()
	{
		$('html').attr('mode', this.darkMode ? 'dark' : 'default') ;
	}

	load()
	{
		try {
			let darkMode = localStorage.getItem('adiict.flipbook.darkMode') ;
			if (darkMode) this.darkMode = !!JSON.parse(darkMode) ;
		}
		catch (err) {
			console.warn('LocalStorage seems to be not available : ' + err) ;
		}
	}

	save()
	{
		try {
			localStorage.setItem('adiict.flipbook.darkMode', JSON.stringify(this.darkMode)) ;
		}
		catch (err) {
			console.warn('LocalStorage seems to be not available : ' + err) ;
		}
	}
}
