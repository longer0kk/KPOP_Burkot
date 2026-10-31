import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lab3 } from './lab-3';

describe('Lab3', () => {
  let component: Lab3;
  let fixture: ComponentFixture<Lab3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lab3],
    }).compileComponents();

    fixture = TestBed.createComponent(Lab3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
