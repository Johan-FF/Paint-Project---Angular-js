import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSinginComponent } from './content-singin.component';

describe('ContentSinginComponent', () => {
  let component: ContentSinginComponent;
  let fixture: ComponentFixture<ContentSinginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSinginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSinginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
