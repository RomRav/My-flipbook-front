import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksAdminService {

  public selectedItem: string = "bookList";

  constructor(public httpClient: HttpClient) { 
    this.httpClient.get('http://127.0.0.1:3000/book/coverTypes')
    .subscribe((response:any)=>{
      console.log(response);
    });
  }
}
