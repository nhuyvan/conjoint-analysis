import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSearcherComponent } from './node-searcher.component';

describe('NodeSearcherComponent', () => {
  let component: NodeSearcherComponent;
  let fixture: ComponentFixture<NodeSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
