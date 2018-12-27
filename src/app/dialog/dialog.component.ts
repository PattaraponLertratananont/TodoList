import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogContent);
  }

}

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.html',
})
export class DialogContent { }
