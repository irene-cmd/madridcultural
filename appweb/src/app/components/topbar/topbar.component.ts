import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreferencesService } from '../../services/preferences.service';

import { User } from '../../interfaces/user';
import { Preference } from '../../interfaces/preference';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  isCollapsed = false;
  user: User | undefined;
  message: string | undefined;
  preferences: Array<Preference> | undefined;

  constructor(
    private preferencesService: PreferencesService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('nombre')){
      this.user = {
        id: parseInt(localStorage.getItem('nombre')!),
        nombre: localStorage.getItem('nombre')!,
        apellidos: localStorage.getItem('apellidos')!,
        fecha_nacimiento: localStorage.getItem('fecha_nacimiento')!,
        email: localStorage.getItem('email')!,
        sexo: localStorage.getItem('sexo')!
      }
    }

    this.getAllPreferences();

  }

  async getAllPreferences(){
    let response: Response = await this.preferencesService.getAllPreferences();
    if(response.responseCode === 1){
      this.message = response.responseMessage;
      this.preferences = response.response;
    }
  }

  logout(){
    
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellidos');
    localStorage.removeItem('fecha_nacimiento');
    localStorage.removeItem('email');
    localStorage.removeItem('sexo');

    this.user = undefined;

  }

}
