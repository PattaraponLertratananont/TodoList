import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../message'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private dialog: MatDialog,
  ) { }
  openDialog() {
    this.dialog.open(DialogContent);
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
})
export class DialogContent {

  addForm = this.fb.group({
    message : ['',Validators.required],
    duedate : new FormControl('',Validators.required)
  })
  date = new FormControl('');
  format = [moment.ISO_8601, "DD/MM/YY"]
  check: any
  datenow = moment(new Date(), 'DD/MM/YY')
  chFormat: boolean
  chBack: boolean
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private http:HttpClient
    ) { }
  checkFormat(inputDate:string) {
    this.check = moment(inputDate, this.format, true).isValid()
    if (this.check == true) {
      this.chFormat = true
      console.log(this.chFormat, "correct format", inputDate)
    } else if (this.check == false) {
      this.chFormat = false
      console.log(this.chFormat, "wrong format", inputDate)
    }
  }
  checkBackDate(inputDate: string) {
    console.log("Input Date : ", inputDate)
    if (this.datenow.diff(moment(inputDate,'DD/MM/YY'), 'days') > 0) {
      this.chBack = false
      console.log(this.chBack, "Back Date",this.datenow.diff(moment(inputDate,'DD/MM/YY'), 'days'))
    } else {
      this.chBack = true
      console.log(this.chBack, "Date Ok",this.datenow.diff(moment(inputDate,'DD/MM/YY'), 'days'))
    }
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'my-auth-token'})
  };
  
  onSubmit(addForm:Message) {
    return this.http.post('http://localhost:1323/write',addForm,{ responseType: 'text'})
    .subscribe(),location.reload();
  }
  
  checkSubmit(){
    if(this.chFormat===true && this.chBack===true){
      return true
    }
    return false
  }
}
