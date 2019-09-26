import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/svc/user.service';
import { BooksAdminService } from 'src/app/svc/books-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(
    public httpClient: HttpClient,
    public user: UserService,
    public booksAdmin: BooksAdminService,
    public route: Router
  ) {

  }

  ngOnInit() {



  }


  valAndAddBook(f) {
    console.log(this.user.currentUser.idUser);
    this.httpClient.post('http://127.0.0.1:3000/book/' + this.user.currentUser.idUser, f.value)
      .subscribe((response: any) => {
        console.log(response);
        this.user.getBookList(1);
      })
  }

}
