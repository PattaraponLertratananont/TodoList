import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment'
import { FormControl, Validators } from '@angular/forms';


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

  date = new FormControl('');
  format = [moment.ISO_8601,"DD/MM/YY"]
  check:any
  checkFormat(){
    this.check = moment(this.date.value,this.format,true).isValid()
    // console.log(this.check)
    if (this.check == true) {
      console.log("currect format")
    }else if(this.check == false){
      console.log("wrong format")
    }
  }
}
