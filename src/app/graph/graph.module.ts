import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GraphComponent } from './graph.component';
import { TooltipComponent } from './views/tooltip/tooltip.component';
import { NodeSearcherComponent } from './views/node-searcher/node-searcher.component';
import { TooltipDirective } from './views/tooltip/tooltip.directive';

@NgModule({
  declarations: [GraphComponent, TooltipComponent, NodeSearcherComponent, TooltipDirective],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [GraphComponent]
})
export class GraphModule { }
