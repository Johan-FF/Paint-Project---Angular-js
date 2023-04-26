import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDrawingComponent } from './content-drawing.component';

describe('ContentDrawingComponent', () => {
  let component: ContentDrawingComponent;
  let fixture: ComponentFixture<ContentDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentDrawingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
