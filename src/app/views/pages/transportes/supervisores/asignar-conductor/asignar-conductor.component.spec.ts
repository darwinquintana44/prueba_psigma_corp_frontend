import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarConductorComponent } from './asignar-conductor.component';

describe('AsignarConductorComponent', () => {
  let component: AsignarConductorComponent;
  let fixture: ComponentFixture<AsignarConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarConductorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
