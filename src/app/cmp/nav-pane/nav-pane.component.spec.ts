import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavPaneComponent } from './nav-pane.component';

describe('NavPaneComponent', () => {
  let component: NavPaneComponent;
  let fixture: ComponentFixture<NavPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
