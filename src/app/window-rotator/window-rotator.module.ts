import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { WindowRotatorComponent } from './window-rotator.component';
import { WindowComponent } from './views/window/window.component';

@NgModule({
  declarations: [WindowRotatorComponent, WindowComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [WindowRotatorComponent, WindowComponent]
})
export class WindowRotatorModule { }
