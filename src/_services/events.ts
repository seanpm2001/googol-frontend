import { Injectable } from '@angular/core';
import { Match } from '../_models/match';
import { Event } from '../_models/event';
import { appConfig } from '../app/app.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EventsService {

    private url: string = appConfig.apiUrl + '/events';
    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
    fakeStorage = new Array<Event>();
    fakeId = 1;
    fakeLocation = "Bar da putaria - Campina Grande";
    
    constructor(private http: HttpClient) { }

    getAll() : Observable<Event[]> {
        return this.http.get<Event[]>(this.url, this.httpOptions)
            .map(events => {
                return events;
            });
    }
    
    create(matchId: string, barId: string){
        let body = {
        "matchId": matchId,
        "barId": barId
        }
        return this.http.post<Event>(this.url, this.httpOptions)
            .map(events => {
                return events;
            });
    }

    getById(_id: string) {
        return this.fakeStorage;
    }

}