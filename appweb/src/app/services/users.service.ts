import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  checkUser(body: Object): Promise<Response>{
    return this.httpClient.post<Response>('http://localhost:3000/login', body).toPromise();
  }

  registerUser(body: Object): Promise<Response>{
    return this.httpClient.put<Response>('http://localhost:3000/signup', body).toPromise();
  }

}
