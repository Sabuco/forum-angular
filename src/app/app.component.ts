import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public token;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    console.log(this.identity);
    console.log(this.token);
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/inicio']);
  }
}
