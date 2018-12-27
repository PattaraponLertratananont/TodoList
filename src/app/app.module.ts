import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent, DialogContent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    DialogContent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  entryComponents:[
    DialogContent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
