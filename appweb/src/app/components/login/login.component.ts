import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', 
      Validators.required
    )
  });

  invalidCredentials: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('id')){
      this.router.navigate(['']);      
    }

  }

  async checkUser(){

    let body = {
      email: this.form.get('email')?.value,
      password: Md5.init(this.form.get('password')?.value)
    };

    let response: any = await this.usersService.checkUser(body);

    if(response.responseCode === 1){

      this.invalidCredentials = false;

      localStorage.setItem('id', (response.response[0].id));
      localStorage.setItem('nombre', (response.response[0].nombre));
      localStorage.setItem('apellidos', (response.response[0].apellidos));
      localStorage.setItem('fecha_nacimiento', (response.response[0].fecha_nacimiento));
      localStorage.setItem('email', (response.response[0].email));
      localStorage.setItem('sexo', (response.response[0].sexo));
      
      this.router.navigate(['']);
    }
    else {
      this.invalidCredentials = true;
    }

  }

}
