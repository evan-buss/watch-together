import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNotificationComponent } from './default-notification.component';

describe('DefaultNotificationComponent', () => {
  let component: DefaultNotificationComponent;
  let fixture: ComponentFixture<DefaultNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultNotificationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNotificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.notification = { title: "title", message: "message" };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
