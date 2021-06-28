import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from '../../../interfaces/Admin';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  inputEmail:string = "";
  inputPassword:string = "";
  inputRecaptcha:string = "";
  formulario:FormGroup;

  constructor(public fb:FormBuilder, private router: Router, public service: AdminService) {
    this.formulario = fb.group({
      inputEmail:new FormControl(''),
      inputPassword:new FormControl(''),
      inputRecaptcha: new FormControl('')
    });
   }

  ngOnInit(): void {
    let token = sessionStorage.getItem('adminToken');
    if(token) {
      this.router.navigate([`/admin-panel`]);
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
  }

  onSubmit() {
    let errorEmail:boolean = false;
    let errorPw:boolean = false;
    let loginAdmin:Admin = {
      email:this.formulario.controls['inputEmail'].value,
      password:this.formulario.controls['inputPassword'].value,
      recaptcha:this.formulario.controls['inputRecaptcha'].value
    }
    if (loginAdmin.email != "") {
      errorEmail = true;
    }
    
    if(loginAdmin.password != "") {
      errorPw = true;
    }

    if(errorEmail == true && errorPw == true) {
      this.service.logAdmin(loginAdmin);
    }
    else{
      alert("Datos de administrador incorrectos");
      console.log("Credenciales invalidas");
    }
  }

  toHome() {
    this.router.navigate([`/home`]);
  }

}
