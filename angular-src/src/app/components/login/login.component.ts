import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {NgFlashMessageService} from 'ng-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.body['success']) {
        console.log(data.body['user']);
        this.authService.storeUserData(data.body['token'], data.body['user']);
        this.ngFlashMessageService.showFlashMessage({
          messages: ['You are now logged in.'],
          dismissible: false,
          timeout: 2000,
          type: 'success'
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: [data.body['msg']],
          dismissible: false,
          timeout: 2000,
          type: 'danger'
        });
        this.router.navigate(['/login']);
      };
    });
  }
}
