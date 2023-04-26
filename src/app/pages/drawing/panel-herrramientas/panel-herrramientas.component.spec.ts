import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelHerrramientasComponent } from './panel-herrramientas.component';

describe('PanelHerrramientasComponent', () => {
  let component: PanelHerrramientasComponent;
  let fixture: ComponentFixture<PanelHerrramientasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelHerrramientasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelHerrramientasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
