import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../../interfaces/RegisterUser';
import { LoginUser } from '../../interfaces/LoginUser';
import { ProfileUser } from '../../interfaces/ProfileUser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  profileUser:ProfileUser = {
    firstname: "",
    lastname: "",
    email: "",
    idcard: "",
    residence_address: "",
    region: "",
    commune: ""
  }

  constructor(private http: HttpClient, private router: Router) { }

  addUser(newUser:RegisterUser) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.servidor}/api/authentication/register`, newUser).subscribe(
      (resp:any) => {
        alert("Se ha registrado satisfactoriamente");
        localStorage.setItem('accessToken', resp['access-token']);
        this.router.navigate([`/home`]).then(() => {
          window.location.reload();
        });;
    },
      (err) => {
        console.log(err);
      }
    );
  }

  logUser(user:LoginUser) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.servidor}/api/authentication/login`, user).subscribe(
      (resp:any) => {
        localStorage.setItem('accessToken', resp['access-token']);
          this.router.navigate([`/home`]).then(() => {
            window.location.reload();
          });
        console.log("Sesion iniciada con exito");
        console.log(resp);
      },
      (err:any) => {
        alert("Datos de inicio de sesion invalidos");
        console.log(err.error.error.message);
      }
      
    );
  }

  getUserData(token:string) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.get(`${this.servidor}/api/authentication/profile`, { headers: headers }).subscribe(
      (resp:any) => {
        let user:ProfileUser = {
          firstname:resp['user']['firstname'],
          lastname:resp['user']['lastname'],
          email:resp['user']['email'],
          idcard:resp['user']['idcard'],
          residence_address:resp['user']['residence_address'],
          region:resp['user']['region'],
          commune:resp['user']['commune']
        }
        this.profileUser = user;
      },
      (err) => console.log(err)
    );
  }

  actUser(user:ProfileUser, token:string) {
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': token
    });
    this.http.put(`${this.servidor}/api/authentication/profile`, user, { headers: headers }).subscribe(
      (resp:any) => {
        console.log(resp);
        this.router.navigate([`/profile`]).then(() => {
          window.location.reload();
        });
      },
      (err) => console.log(err)
    );
  }

}