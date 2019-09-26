import { Injectable } from '@angular/core';
import { UserData } from '../ett/userData';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BooksAdminService } from './books-admin.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuthenticate = false;
  public currentUser: UserData;
  public booksTable: Array<Object>;

  constructor(
    public httpClient: HttpClient,
    public booksAdmin: BooksAdminService
  ) {

  }


  getBookList(item) {
    if (item == 1) {
      this.booksAdmin.ListOrAddBook = true;
      this.httpClient.get('http://127.0.0.1:3000/user/bookList/' + this.currentUser.email)
        .subscribe((response: any) => {
          if (response.error) {
          } else {
            this.booksTable = response.dataBookList;
          }
        })
    }else{
      this.booksAdmin.ListOrAddBook = false;
    }
  }

}
