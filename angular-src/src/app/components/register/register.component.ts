import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {NgFlashMessageService} from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  
  constructor(
    private validateService: ValidateService, 
    private ngFlashMessageService: NgFlashMessageService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please fill in all fields'],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });
      return false;
    }

    //Required Email
    if(!this.validateService.validateEmail(user.email)) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please enter a valid email'],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.body['success']) {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['You are now registered and can log in'],
          dismissible: false,
          timeout: 2000,
          type: 'success'
        });
        this.router.navigate(['/login']);
      } else {
        this.ngFlashMessageService.showFlashMessage({
          messages: ['Something went wrong.'],
          dismissible: false,
          timeout: 2000,
          type: 'danger'
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
