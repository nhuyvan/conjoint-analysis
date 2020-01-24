import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ligma-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'window',
    '[style.visibility]': 'visible ? "visible" : "hidden"'
  }
})
export class WindowComponent {

  visible = false;

}
