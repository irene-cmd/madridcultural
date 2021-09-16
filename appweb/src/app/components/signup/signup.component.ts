import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zÀ-ÿA-Z\u002d ]+$")
    ]),
    surnames: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zÀ-ÿA-Z\u002d ]+$")
    ]),
    address: new FormControl(''),
    birthdate: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('',
      Validators.required
    )
    ,
    genre: new FormControl('O')
  });

  userCreated: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('id')){
      this.router.navigate(['']);      
    }

  }

  async registerUser() {

    let fecha_nacimiento;

    if(this.form.get('birthdate')?.value === ''){
      fecha_nacimiento = "0000-00-00";
    } else {
      fecha_nacimiento = this.form.get('birthdate')?.value;
    }

    let body = {
      nombre: this.form.get('name')?.value,
      apellidos: this.form.get('surnames')?.value,
      direccion: this.form.get('address')?.value,
      fecha_nacimiento: fecha_nacimiento,
      email: this.form.get('email')?.value,
      password: Md5.init(this.form.get('password')?.value),
      sexo: this.form.get('genre')?.value
    };

    let response = await this.usersService.registerUser(body);

    if (response.responseCode === 1) {
      this.userCreated = true;
    }
    else {
      console.log(response.responseMessage);
    }
    
  }

}

