import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipViewComponent } from './flip-view.component';

describe('FlipViewComponent', () => {
  let component: FlipViewComponent;
  let fixture: ComponentFixture<FlipViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
