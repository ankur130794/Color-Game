import { Component, OnInit, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';

@Injectable()
export class HackathonService {

 constructor(private http: Http) { }

 sub: Subscription;
 public count = 0;
 public change: Boolean = false;
 public finish: Boolean = true;
 public ticks = 0;
 public minutesDisplay = 0;
 public hoursDisplay = 0;
 public secondsDisplay = 0;
 colors;
 Url = 'http://172.23.238.209:8080/hackathon';
 private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json',
 'Access-Control-Allow-Origin' : 'http://localhost:4200', 'Access-Control-Allow-Credentials': 'true'});

 // tslint:disable-next-line:one-line
 create(name, emailId, projectId, location, gitURL, score){

   console.log('Submitting json', JSON.stringify({name: name, emailId: emailId,
     projectId: projectId, location: location, gitURL: gitURL}));

     const j = JSON.stringify({name: name, emailId: emailId,
       projectId: projectId, location: location, gitURL: gitURL});
       this.http
       .post('http://172.23.238.209:8080/hackathon', j, {headers: this.headers}).toPromise().catch(this.handleError);

 }

 createModel(model) {
   console.log('Submitting model', JSON.stringify(model));
   return this.http
   .post(this.Url, JSON.stringify(model), { headers: this.headers }).toPromise().catch(this.handleError);
 }

 private handleError(error: any) {
    console.error('An error occurred', error); // for demo purposes only
  }

}