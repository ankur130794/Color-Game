import { Submit } from './submit';
import { HackathonService } from './hackathon.service';
import { Component} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormsModule } from '@angular/forms';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
  
   timeOutFlag:boolean=false; // if true than game timeout else game running;
   timeOutStarted:boolean=false; //if false than game timer not yet started
   rand:number =1;// random function variable initialised.
   score:number=0;//initial score is zero.

   val:number=1;//a global variable to handle color change requests initialised at 1
   idbut:string='but1';
  model: Submit = new Submit();
   
   constructor(private hackathon: HackathonService){
     let numbers = Observable.timer(500,500); // Call after 500 second.. Please set your time
     numbers.subscribe(time =>{
       // this.GenerateRandFour();
       // console.log(this.rand);
       this.changeColors(this.val,this.idbut);
       // console.log(this.val,this.idbut);
     });
   }
   
// a funtion to start the game timer and flag end of game.
   StartTimeout(){
     setTimeout(() => {
       this.timeOutFlag=true;
     }, 90000);
   }

   // random number generator
   GenerateRandFour() {
     this.rand = (Math.floor((Math.random( ) *10)+1)%4)+1;  
   }

   // color change function
   changeColors(quadValue:number,id:string){
     document.getElementById(id).style.background="#000";
     this.GenerateRandFour();
     let elementId = this.rand.toString();
    //  console.log("elementId"+elementId);
     elementId = "but" + elementId;
     document.getElementById(elementId).style.background="#fff";
     this.val=this.rand;
     this.idbut=elementId;  
   }
   
   //function handling click event
   //for first iteration checks if the time out has started or not.
   QuadrantClick(quadValue:number,id:string){
     if(this.timeOutStarted===false){
       this.StartTimeout(); //starts game timer on first function invocation;
       this.timeOutStarted=true;
      // console.log("timeoutStarted");
     }
     if(this.timeOutFlag===false){
       if(quadValue==this.rand){
         this.score++;
         console.log("score"+this.score);
         this.changeColors(quadValue,id);
       }
       else{
         console.log("invalid move")
       }
     }
     else{
         console.log("finalscore"+this.score);
         console.log('your 90 secs are over');
         alert('90 seconds over! Press save to submit');
     }

   }
   // function handling submission of form
   onSubmit(name, email, id, city, git){
    this.model.name = name;
    this.model.emailId = email;
    this.model.projectId = id;
    this.model.location = city;
    this.model.gitURL = git;
    console.log('Model', this.model);
    this.hackathon.create(name, email, id, city, git, this.score);
  }

}