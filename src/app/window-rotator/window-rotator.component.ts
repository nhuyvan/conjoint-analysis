import { Component, ViewEncapsulation, ContentChildren, AfterContentInit, QueryList } from '@angular/core';

import { WindowComponent } from './views/window/window.component';

@Component({
  selector: 'ligma-window-rotator',
  templateUrl: './window-rotator.component.html',
  styleUrls: ['./window-rotator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WindowRotatorComponent implements AfterContentInit {

  currentIndex = 0;
  numberOfWindows = 0;

  @ContentChildren(WindowComponent)
  private _windowQueryList: QueryList<WindowComponent>;

  private _previousIndex = 0;
  private _windows: WindowComponent[];

  ngAfterContentInit() {
    this._windows = this._windowQueryList.toArray();
    this.numberOfWindows = this._windows.length;
    this._windows[0].visible = true;
  }

  nextWindow() {
    // This is false only when the users click next for the very first time
    // when previous index and current index are both 0
    if (this.currentIndex !== this._previousIndex) {
      this._windows[this._previousIndex].visible = false;
    }
    this._previousIndex = this.currentIndex;
    // We want currentIndex to wrap around
    this.currentIndex = ++this.currentIndex % this._windowQueryList.length;
    this._windows[this.currentIndex].visible = true;
  }

  previousWindow() {
    // This is false only when the users click previous for the very first time
    // when previous index and current index are both 0
    if (this.currentIndex !== this._previousIndex) {
      this._windows[this._previousIndex].visible = false;
    }
    this._previousIndex = this.currentIndex;
    this.currentIndex--;
    if (this.currentIndex === -1) {
      this.currentIndex = this._windowQueryList.length - 1;
    }
    this._windows[this.currentIndex].visible = true;
  }

  formatNumberToTwoDigits(value: number) {
    return value < 10 ? '0' + value : String(value);
  }

}
