import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/svc/user.service';
import { BooksAdminService } from 'src/app/svc/books-admin.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/ett/userData';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public message = "";
  constructor(
    public httpClient: HttpClient,
    public user: UserService,
    public booksAdmin: BooksAdminService,
    public route: Router
  ) { }

  ngOnInit() {}

    //Envoie au serveur des données du formulaire d'ajout de livres 
  valAndAddBook(f) {

    console.log(f.value);

    this.httpClient.post('http://127.0.0.1:3000/book/' + this.user.currentUser.idUser, f.value)
      .subscribe((response: any) => {
        console.log(response);
        this.user.getItem("bookList");
      });
  }

  //Récupération des images selectionné
  getFiles(ev) {
    for (var i = 0; i < ev.target.files.length; i++) {
      console.log(ev.target.files[i]);
    }

  }


  updateBook(f) {
    const updateUser: UserData = {
      idUser: this.user.currentUser.idUser,
      userName: f.value.name,
      userFirstname: f.value.firstname,
      email: this.user.currentUser.email,
      password: this.user.currentUser.password
    }
    this.message = "";
    this.httpClient.get('http://127.0.0.1:3000/user/' + f.value.email)
      .subscribe((response: any) => {
        if (response.userRes == "" || response.userRes[0].email == updateUser.email) {
          this.httpClient.put('http://127.0.0.1:3000/user/' + updateUser.idUser, updateUser)
            .subscribe((response: any) => {
              console.log(response);
              this.message = "Modification réussi " + response;
              this.user.currentUser = updateUser;
              this.user.currentUser.idUser = response.idUser;
              this.user.getItem("bookList");
              this.route.navigate(['booklist']);
            })
        } else {
          this.message = "Cet adresse e-mail existe déjà.";
        }
      })

  }

}
