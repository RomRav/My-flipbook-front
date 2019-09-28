import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { UserData } from 'src/app/ett/userData';
import { Router } from '@angular/router';
import { UserService } from 'src/app/svc/user.service';




@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public message = "";
  constructor(
    public user: UserService,
    public httpClient: HttpClient,
    public route: Router
  ) { }

  ngOnInit() {
  }


  checkAndRegistration(dataInput) {
    const newUser: UserData = {
      idUser: null,
      userName: dataInput.value.name,
      userFirstname: dataInput.value.firstname,
      email: dataInput.value.email,
      password: dataInput.value.password
    }
    const mdpConfSaisie = dataInput.value.confPassword

    if (mdpConfSaisie != newUser.password) {
      this.message = "la saisie du mot de passe n'est pas identique!"
    } else {
      this.message = "";
      this.httpClient.get('http://127.0.0.1:3000/user/' + newUser.email)
        .subscribe((response: any) => {
          if (response.userRes == "") {
            this.httpClient.post('http://127.0.0.1:3000/user/add', newUser)
              .subscribe((response: any) => {
                this.message = "Création du compte " + response;
                this.user.currentUser = newUser;
                this.user.currentUser.idUser = response.idUser;
                console.log(this.user.currentUser);
                this.user.isAuthenticate = true;
                this.user.getItem("bookList");
                this.route.navigate(['booklist']);
              })
          } else {
            this.message = "Compte éxistant ";
          }
        })
    }
  }
}
