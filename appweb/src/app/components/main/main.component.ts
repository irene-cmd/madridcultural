import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../interfaces/event';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  message: string | undefined;
  events: Array<Event> | undefined;

  constructor(
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.getTopEvents();
  }

  async getTopEvents(){
    let response: Response = await this.eventsService.getTopEvents();
    if(response.responseCode === 1){
      this.message = response.responseMessage;
      this.events = response.response;
    }
  }

}
