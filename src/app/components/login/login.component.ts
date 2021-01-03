import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public msgLoginSuccess: string;
  public msgLoginError: string;

  constructor(
    private _userService:UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.msgLoginSuccess = 'Te has identificado correctamente';
    this.msgLoginError = 'No te has podido identificar';
    this.page_title = 'Identificate';
    this.user = new User('','','','','','','ROLE_USER');
  }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this._userService.signUp(this.user).subscribe(
      response => {
        if(response.user && response.user._id) {
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //Conseguir token usuario identificado
          this._userService.signUp(this.user, true).subscribe(
            response => {
              if(response.token) {
                this.token = response.token;
                localStorage.setItem('token', this.token);

                this.status = 'success';
                this._router.navigate(['/inicio']);
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
