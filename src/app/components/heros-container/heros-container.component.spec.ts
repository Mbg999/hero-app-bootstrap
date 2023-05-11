import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosContainerComponent } from './heros-container.component';

describe('HerosContainerComponent', () => {
  let component: HerosContainerComponent;
  let fixture: ComponentFixture<HerosContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerosContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerosContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
