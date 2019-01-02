import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Message } from './message'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http:HttpClient) { }
  // localUrl = 'http://localhost:1323/'
  getText():Observable<Message[]>{
    return this.http.get<Message[]>('http://localhost:1323/read')
  }
}
