import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    'message': ['',Validators.required],
    'date': ['',Validators.required]
  })
  date = new FormControl('');
  format = [moment.ISO_8601, "DD/MM/YY"]
  check: any
  datenow = moment(new Date(), 'DD/MM/YY')
  chFormat: boolean
  chBack: boolean
  constructor(
    private datePipe: DatePipe,
    private fb: FormBuilder
    ) { }
  checkFormat() {
    this.check = moment(this.date.value, this.format, true).isValid()
    if (this.check == true) {
      this.chFormat = true
      console.log(this.chFormat, "correct format")
    } else if (this.check == false) {
      this.chFormat = false
      console.log(this.chFormat, "wrong format")
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
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.addForm.value);
  }
}
