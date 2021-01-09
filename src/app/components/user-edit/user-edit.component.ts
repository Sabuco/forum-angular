import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { global } from "../../services/global";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public msgEditSuccess: string;
  public msgEditError: string;
  public user: User;
  public identity;
  public token;
  public status;
  public afuConfig;
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Ajustes de usuario';
    this.msgEditSuccess = 'Has guardado los cambios correctamente';
    this.msgEditError = 'Los datos no se han guardado';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    this.url = global.url;

    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .png, .jpeg, .gif",
      maxSize: "50",
      uploadAPI:  {
        url: this.url + "upload-avatar",
        headers: {
          "Authorization" : this.token
        }
      },
      theme: "dragNDrop",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      replaceTexts: {
        selectFileBtn: 'Seleccionar imagen...',
        uploadBtn: 'Subir avatar',
        dragNDropBox: 'Arrastrar imagen aquí',
        afterUploadMsg_success: 'Se ha subido correctamente',
        afterUploadMsg_error: 'No se ha subido correctamente',
        sizeLimit: 'Tamaño límite'
      }

    };
  }

  avatarUpload(data) {
    this.user.image = data.body.user.image;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._userService.update(this.user).subscribe(
      response => {
        if(!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );

  }

}
