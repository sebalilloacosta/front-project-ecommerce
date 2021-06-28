import { Component, OnInit } from '@angular/core';
import { ProfileUser } from '../../interfaces/ProfileUser';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  userData:ProfileUser = {
    firstname: "",
    lastname: "",
    email: "",
    idcard: "",
    residence_address: "",
    region: "",
    commune: ""
  }

  constructor(public service:UsersService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken')
    if (token) {
      this.service.getUserData(token);
      this.userData = this.service.profileUser;
    }
  }

}
