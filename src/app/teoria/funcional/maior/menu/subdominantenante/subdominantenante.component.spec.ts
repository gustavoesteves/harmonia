import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdominantenanteComponent } from './subdominantenante.component';

describe('SubdominantenanteComponent', () => {
  let component: SubdominantenanteComponent;
  let fixture: ComponentFixture<SubdominantenanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubdominantenanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubdominantenanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
