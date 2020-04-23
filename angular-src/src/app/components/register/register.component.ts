import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {NgFlashMessageService} from 'ng-flash-messages'

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
  
  constructor(private validateService: ValidateService, private ngFlashMessageService: NgFlashMessageService) { }

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
    if(!this.validateService.validateEmail(user)) {
      this.ngFlashMessageService.showFlashMessage({
        messages: ['Please enter a valid email'],
        dismissible: true,
        timeout: false,
        type: 'danger'
      });
      return false;
    }
  }
}
