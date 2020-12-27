import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { global } from "./global";

@Injectable()
export class UserService {
    public url: string;
    constructor(private _http: HttpClient)
    {
        this.url = global.url;
    }

    prueba() {
        return "testeo servicio";
    }

    register(user): Observable<any> {
        //Convertir el objeto del usuario a json string
        let params = JSON.stringify(user);

        //Definir cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Petición AJAX
        return this._http.post(this.url + 'register', params, {headers:headers});
    }
}