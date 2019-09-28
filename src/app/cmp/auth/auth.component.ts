import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/svc/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  // public authEmail: string = "";
  // public authPwd: string = "";
  public message: string = "";
  // public hasDote: boolean = false;
  // public hasAt: boolean = false;
  // public firstNotAt: boolean = false;
  // public letterAfterDot: boolean = false;
  // public letterAfterAt: boolean = false;

  constructor(
    public user: UserService,
    public route: Router,
    public httpClient: HttpClient,
    public activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }
  /**
   * Méthode de gestion de l'identification
   * @param form 
   */
  checkAndLog(form: NgForm) {
    this.message = "";

    if (form.value.password != " ") {
      this.httpClient.post('http://127.0.0.1:3000/user/auth', form.value).subscribe((response: any) => {

        if (response.user) {
          this.user.isAuthenticate = true;
          this.user.currentUser = response.user[0];
          console.log(this.user.currentUser);
          this.user.getItem('bookList');
          this.route.navigate(['booklist']);
        } else {
          this.message = "Compte inexistant cliquez sur \"Inscription\" pour crée un compte."
          console.log(response);
        }
      })

    } else {
      this.message = "Saisie incorrect."
    }
  }


  // for (var i = 0; i < this.authEmail.length; i++) {
  //   if (this.authEmail[0] != "@") {
  //     this.firstNotAt = true;
  //   }
  //   if (this.authEmail[i] == '.') {
  //     this.hasDote = true;
  //     if (this.authEmail[i + 1] >= 'A' && this.authEmail[i + 1] <= 'z') {
  //       this.letterAfterDot = true;
  //     }
  //   }
  //   if (this.authEmail[i] == '@') {
  //     this.hasAt = true;
  //     if (this.authEmail[i + 1] >= 'A' && this.authEmail[i + 1] <= 'z') {
  //       this.letterAfterAt = true;
  //     }
  //   }
  // }
  // if (this.hasDote != true || this.hasAt != true || this.firstNotAt != true || this.letterAfterDot != true || this.letterAfterAt != true) {
  //   console.log(this.hasDote, this.hasAt, this.firstNotAt, this.letterAfterDot, this.letterAfterAt);
  //   this.message = "Ce n'est pas un email";

  // } else {
  //   console.log(this.hasDote, this.hasAt, this.firstNotAt, this.letterAfterDot, this.letterAfterAt);
  //   this.message = "email ok";
  // }

}
