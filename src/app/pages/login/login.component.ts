import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../../interfaces/LoginUser';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inputEmail:string = "";
  inputPassword:string = "";
  inputRecaptcha:string = "";
  formulario:FormGroup;


  constructor(public fb:FormBuilder, public service:UsersService, private router: Router) { 
    this.formulario = fb.group({
      inputEmail:new FormControl(''),
      inputPassword:new FormControl(''),
      inputRecaptcha: new FormControl('')
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token){
      this.router.navigate([`/home`]);
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

  onSubmit() {
    let errorEmail:boolean = false;
    let errorPw:boolean = false;
    let loginUser:LoginUser = {
      email:this.formulario.controls['inputEmail'].value,
      password:this.formulario.controls['inputPassword'].value,
      recaptcha:this.formulario.controls['inputRecaptcha'].value
    }
    if (loginUser.email != "") {
      errorEmail = true;
    }
    
    if(loginUser.password != "") {
      errorPw = true;
    }

    if(errorEmail == true && errorPw == true) {
      this.service.logUser(loginUser);
    }
    else{
      alert("Datos de inicio de sesion incorrectos");
      console.log("Credenciales invalidas");
    }
  }

  toRegister() {
    this.router.navigate([`/register`]);
  }
}
