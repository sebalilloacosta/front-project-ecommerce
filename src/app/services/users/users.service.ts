import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Payload {
  'iss':string,
  'access-token':string
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  servidor = 'https://ecommerce-api-develop.herokuapp.com';
  firstname:string = "";
  lastname:string = "";
  email:string = "";
  password:string = "";
  confirmPassword:string = "";
  idcard:string = "";
  residence_address:string = "";
  region:string = "";
  commune:string = "";

  errorMssge:string = "";

  constructor(private http: HttpClient) { }

  addUser(newUser:any) {
    return this.http.post(`${this.servidor}/api/authentication/register`, newUser).subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err)
    );
  }

  logUser(user:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    return this.http.post(`${this.servidor}/api/authentication/login`, user).subscribe(
      (data:any) => {
        if (data['message'] === "Invalid credentials") {
          console.log(data);
          this.errorMssge = "Usuario incorrecto";
        }
        else {
          console.log(data);
          localStorage.setItem('accessToken', data['access-token']);
          window.location.reload();
        }
      });
  }
}