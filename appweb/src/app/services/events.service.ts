import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTopEvents(): Promise<Response>{
    return this.httpClient.get<Response>('http://localhost:3000/eventos').toPromise();
  }

  getEventsFromPreference(id: number): Promise<Response>{
    return this.httpClient.get<Response>('http://localhost:3000/eventos/preferencias/' + id).toPromise();
  }

  getEvent(id: number): Promise<Response>{
    return this.httpClient.get<Response>('http://localhost:3000/eventos/' + id).toPromise();
  }

  createEvent(body: Object): Promise<Response>{
    return this.httpClient.put<Response>('http://localhost:3000/eventos', body).toPromise();
  }

  getAllSubscribersToAnEvent(id: number): Promise<Response>{
    return this.httpClient.get<Response>('http://localhost:3000/eventos/' + id + '/subscriptores').toPromise();
  }

  insertNewSubscriberToAnEvent(idUser: number, idEvent: number): Promise<Response>{
    let body = {
      id_usuario: idUser,
      id_evento: idEvent
    }
    return this.httpClient.put<Response>('http://localhost:3000/subscribeMe', body).toPromise();
  }

}
