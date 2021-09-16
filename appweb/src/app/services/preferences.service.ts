import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllPreferences(): Promise<Response>{
    return this.httpClient.get<Response>('http://localhost:3000/preferencias').toPromise();
  }

  getPreference(id: number): Promise<Response>{
    return this.httpClient.get<Response>('http://localhost:3000/preferencias/' + id).toPromise();
  }

}
