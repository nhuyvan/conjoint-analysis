import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowRotatorComponent } from './window-rotator.component';

describe('WindowRotatorComponent', () => {
  let component: WindowRotatorComponent;
  let fixture: ComponentFixture<WindowRotatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowRotatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowRotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
