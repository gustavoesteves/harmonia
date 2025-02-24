import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiminutoComponent } from './diminuto.component';

describe('DiminutoComponent', () => {
  let component: DiminutoComponent;
  let fixture: ComponentFixture<DiminutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiminutoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiminutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
