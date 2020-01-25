import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WindowRotatorModule } from './window-rotator/window-rotator.module';
import { GraphModule } from './graph/graph.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WindowRotatorModule,
    GraphModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
