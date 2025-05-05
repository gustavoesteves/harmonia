import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalismoComponent } from './modalismo.component';

describe('ModalismoComponent', () => {
  let component: ModalismoComponent;
  let fixture: ComponentFixture<ModalismoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalismoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalismoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
