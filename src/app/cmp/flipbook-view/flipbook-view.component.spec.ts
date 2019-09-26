import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipbookViewComponent } from './flipbook-view.component';

describe('FlipbookViewComponent', () => {
  let component: FlipbookViewComponent;
  let fixture: ComponentFixture<FlipbookViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlipbookViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipbookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
