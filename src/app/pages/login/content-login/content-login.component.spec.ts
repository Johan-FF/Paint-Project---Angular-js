import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLoginComponent } from './content-login.component';

describe('ContentLoginComponent', () => {
  let component: ContentLoginComponent;
  let fixture: ComponentFixture<ContentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
