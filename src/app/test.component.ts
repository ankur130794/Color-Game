import { Component } from '@angular/core';


@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class TestComponent {
 title = 'app';
 getRandomNumber(i: number) {
    Math.floor((Math.random() * 10) + 1);
  }
  R
}
