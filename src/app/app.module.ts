import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { OverlayModule } from "@angular/cdk/overlay";

import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';
@NgModule({
  imports:[
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule, 
    OverlayModule,
    TreeModule,
    ContextMenuModule,
    MenuModule,
    ],
  declarations: [ AppComponent, HelloComponent ],
  providers: [
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
