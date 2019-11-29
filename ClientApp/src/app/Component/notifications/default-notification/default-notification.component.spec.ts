import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNotificationComponent } from './default-notification.component';

describe('DefaultNotificationComponent', () => {
  let component: DefaultNotificationComponent;
  let fixture: ComponentFixture<DefaultNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
