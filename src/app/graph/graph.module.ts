import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphComponent } from './graph.component';
import { TooltipComponent } from './views/tooltip/tooltip.component';

@NgModule({
  declarations: [GraphComponent, TooltipComponent],
  imports: [
    CommonModule
  ],
  exports: [GraphComponent]
})
export class GraphModule { }
