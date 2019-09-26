import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksAdminService {

  public ListOrAddBook: boolean = true;

  constructor() { }
}
