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
  selectedFile = {
    file: File
  };
  public message = "";
  public uploadImage;
  constructor(
    public httpClient: HttpClient,
    public user: UserService,
    public booksAdmin: BooksAdminService,
    public route: Router
  ) { }

  ngOnInit() { }

  //Envoie au serveur des données du formulaire d'ajout de livres 
  valAndAddBook(f) {
    f.value.file = this.uploadImage;
    console.log(f.value);
    this.httpClient.post('http://127.0.0.1:3000/book/' + this.user.currentUser.idUser, f.value)
      .subscribe((response: any) => {
        if (response.insert) {
          this.uploadImage = [];
        }
        console.log(response.insert);
        this.user.getItem("bookList");
      });
  }

  //Récupération des images selectionné (et modification du nom des fichiers)=> a faire !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getFiles(ev) 
<<<<<<< HEAD
    const reader = new FileReader();
=======
    var reader = new FileReader();
    reader.addEventListener("loadend", () => {
      this.uploadImage.push(reader.result);
    });
>>>>>>> 5ce8c95ef42a469892fcff74691a5a9bf4b9e461

    for (var i = 0; i < ev.target.files.length; i++) {
      reader.readAsDataURL(ev.target.files[i]);
    }
<<<<<<< HEAD
    reader.addEventListener('load', (event: any) => {
      this.selectedFile.file = this.uploadImage;
    });
    reader.readAsDataURL(this.uploadImage);

=======

    console.log(this.uploadImage);
>>>>>>> 5ce8c95ef42a469892fcff74691a5a9bf4b9e461
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
