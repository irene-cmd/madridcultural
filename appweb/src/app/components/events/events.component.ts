import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Event } from '../../interfaces/event';
import { User } from '../../interfaces/user';
import { Response } from '../../interfaces/response';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  message: string | undefined;
  events: Array<Event> = [];
  id: number | undefined;
  subscribers: Array<any> | undefined;
  subscribersCount: number = 0;
  ownerName: string | undefined;
  ownerId: number | undefined;
  isSubscriber: boolean = false;
  user: boolean = false;

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.id! = val.id;
      this.getEvent();
      this.getAllSubscribers();
      if (localStorage.getItem('nombre')) {
        this.user = true;
      }
    });
  }

  async getEvent() {
    let response: Response = await this.eventsService.getEvent(this.id!);
    if (response.responseCode === 1) {
      this.message = response.responseMessage;
      this.events = response.response;
    }
  }

  async getAllSubscribers() {
    let response: Response = await this.eventsService.getAllSubscribersToAnEvent(this.id!);
    if (response.responseCode === 1) {
      this.subscribers = response.response;
      this.subscribersCount = this.subscribers.length;
      this.subscribers.forEach(subscriber => {
        console.log(subscriber);
        if (subscriber.esPropietario) {
          this.ownerName = subscriber.nombre + ' ' + subscriber.apellidos;
        }
        if (subscriber.id === parseInt(localStorage.getItem('id')!)) {
          this.isSubscriber = true;
        }
      });
    }
  }

  async registerUserToEvent() {
    let response: Response = await this.eventsService.insertNewSubscriberToAnEvent(parseInt(localStorage.getItem('id')!), this.id!);
    if (response.responseCode === 1) {
      this.message = response.responseMessage;
      this.isSubscriber = true;
      this.subscribersCount += 1;
    }
  }

}
