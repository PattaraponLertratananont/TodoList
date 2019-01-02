import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service'
import { Message } from './message'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Note';
  texts:Message[]=[]
  check=false
  date = new Date()
  datenow = this.datePipe.transform(this.date,'dd/MM/yy')
  constructor(
    private config:ConfigService,
    private datePipe:DatePipe,
    ){}
  ngOnInit(){
    this.showText()
    console.log(this.datenow)
  }
  showText(){
    this.config.getText()
    .subscribe(data => this.texts=data)
  }
  checkDate(param:any){
    console.log(param)
    if(this.datenow===param){
      return true;
    }
    return false;
  }
}
