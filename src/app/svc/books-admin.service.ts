import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksAdminService {

  public selectedItem: string = "bookList";

  constructor() { }
}
