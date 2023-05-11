import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosGridComponent } from './heros-grid.component';

describe('HerosGridComponent', () => {
  let component: HerosGridComponent;
  let fixture: ComponentFixture<HerosGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerosGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
