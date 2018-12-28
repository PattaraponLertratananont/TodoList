import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service'
import { Message } from './message'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Note';
  texts:Message[]=[]
  constructor(private config:ConfigService){}
  ngOnInit(){
    this.showText()
  }
  showText(){
    this.config.getText()
    .subscribe(data => this.texts=data)
  }
}
