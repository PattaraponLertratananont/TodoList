import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
<<<<<<< HEAD
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../message'
import { Observable } from 'rxjs';
>>>>>>> refs/remotes/origin/master

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
<<<<<<< HEAD
    date : new FormControl('',Validators.required)
=======
    duedate : new FormControl('',Validators.required)
>>>>>>> refs/remotes/origin/master
  })
  date = new FormControl('');
  format = [moment.ISO_8601, "DD/MM/YY"]
  check: any
  datenow = moment(new Date(), 'DD/MM/YY')
  chFormat: boolean
  chBack: boolean
  constructor(
    private datePipe: DatePipe,
<<<<<<< HEAD
    private fb: FormBuilder
=======
    private fb: FormBuilder,
    private http:HttpClient
>>>>>>> refs/remotes/origin/master
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
<<<<<<< HEAD
=======
    }
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  onSubmit() {
    // return this.http.post('http://localhost:1323/write',JSON.stringify(addForm),this.httpOptions),console.log("PASS")
    return this.http.post('http://localhost:1323/write',this.addForm.value,this.httpOptions),console.log(this.addForm.value)
  }
  checkSubmit(){
    if(this.chFormat===true && this.chBack===true){
      return true
>>>>>>> refs/remotes/origin/master
    }
    return false
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.addForm.value);
  }
}
