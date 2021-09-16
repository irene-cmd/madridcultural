import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { PreferencesService } from '../../services/preferences.service';
import { Preference } from '../../interfaces/preference';
import { Response } from '../../interfaces/response';


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    place: new FormControl('', [
      Validators.required
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    hour: new FormControl('', [
      Validators.required
    ]),
    preference: new FormControl('1'),
    description: new FormControl('')
  });

  message: string | undefined;
  preferences: Array<Preference> | undefined;

  eventCreated: boolean = false;

  constructor(
    private eventsService: EventsService,
    private preferencesService: PreferencesService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(!localStorage.getItem('id')){
      this.router.navigate(['']);      
    } else {
      this.getAllPreferences();
    }

  }

  async createEvent() {

    let body = {
      nombre: this.form.get('name')?.value,
      lugar: this.form.get('place')?.value,
      fecha: this.form.get('date')?.value + ' ' + this.form.get('hour')?.value + ':00',
      fk_preferencia: parseInt(this.form.get('preference')?.value),
      descripcion: this.form.get('description')?.value,
      id_usuario: localStorage.getItem('id')
    };

    let response = await this.eventsService.createEvent(body);

    console.log(response);

    if (response.responseCode === 1) {
      this.eventCreated = true;
    }
    else {
      console.log(response.responseMessage);
    }
    
  }

  async getAllPreferences(){
    let response: Response = await this.preferencesService.getAllPreferences();
    if(response.responseCode === 1){
      this.message = response.responseMessage;
      this.preferences = response.response;
    }
  }

}

