import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { Event } from '../../interfaces/event';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  preferenceName: string | undefined;
  message: string | undefined;
  events: Array<Event> = [];
  id: number | undefined;

  constructor(
    private eventsService: EventsService,
    private preferencesService: PreferencesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.id! = val.id;
      this.getPreference();
      this.getEventsFromPreference();
    });
  }

  async getEventsFromPreference(){
    let response: Response = await this.eventsService.getEventsFromPreference(this.id!);
    if(response.responseCode === 1){
      this.message = response.responseMessage;
      this.events = response.response;
    }
    else {
      this.message =response.responseMessage;
      this.events.splice(0);
    }
  }

  async getPreference(){
    let response: Response = await this.preferencesService.getPreference(this.id!);
    if(response.responseCode === 1){
      this.message = response.responseMessage;
      this.preferenceName = response.response[0].nombre;
    }
  }

}
