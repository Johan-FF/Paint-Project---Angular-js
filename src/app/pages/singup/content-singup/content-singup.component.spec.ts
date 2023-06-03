import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSingupComponent } from './content-singup.component';

describe('ContentSingupComponent', () => {
  let component: ContentSingupComponent;
  let fixture: ComponentFixture<ContentSingupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSingupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
