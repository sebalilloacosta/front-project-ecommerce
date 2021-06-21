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
  formulario:FormGroup;

  constructor(public fb:FormBuilder, public service:UsersService, private router: Router) { 
    this.formulario = fb.group({
      inputEmail:new FormControl(''),
      inputPassword:new FormControl('')
    });
  }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    if (token){
      window.location.href="/home";
    }
  }

  onSubmit() {
    let loginUser:LoginUser = {
      email:this.formulario.controls['inputEmail'].value,
      password:this.formulario.controls['inputPassword'].value,
    }

    this.service.logUser(loginUser);
  }
}
