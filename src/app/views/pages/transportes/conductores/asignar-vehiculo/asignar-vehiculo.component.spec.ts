import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarVehiculoComponent } from './asignar-vehiculo.component';

describe('AsignarVehiculoComponent', () => {
  let component: AsignarVehiculoComponent;
  let fixture: ComponentFixture<AsignarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
