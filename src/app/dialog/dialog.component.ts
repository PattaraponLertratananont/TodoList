import { Component } from '@angular/core';
import { Message } from '../message'
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment'

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

  apiUrl='http://localhost:1323'
  formatDate = [moment.ISO_8601, "DD/MM/YY"]
  datenow = moment(new Date(), 'DD/MM/YY')

  checkFormats: any
  chFormat: boolean
  chBack: boolean
  
  addForm = this.formBuilder.group({
    message: ['', Validators.required],
    duedate: new FormControl('', Validators.required)
  })

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }
  // Check Format in Dialog
  checkFormat(inputDate: string) {
    this.checkFormats = moment(inputDate, this.formatDate, true).isValid()
    if (this.checkFormats == true) {
      this.chFormat = true
    } else if (this.checkFormats == false) {
      this.chFormat = false
    }
  }
  // Check Back Date in Dialog box 
  checkBackDate(inputDate: string) {
    if (this.datenow.diff(moment(inputDate, 'DD/MM/YY'), 'days') > 0) {
      this.chBack = false
    } else {
      this.chBack = true
    }
  }
  // Check Validator in Dialog Form, Must correct format and not back date will be return 'true'
  checkSubmit() {
    if (this.chFormat === true && this.chBack === true) {
      return true
    }
    return false
  }
  // Call API POST
  onSubmit(dataForm: Message) {
    return this.http.post(this.apiUrl+'/write', dataForm, { responseType: 'text' })
      .subscribe(),
      location.reload();
  }
}
