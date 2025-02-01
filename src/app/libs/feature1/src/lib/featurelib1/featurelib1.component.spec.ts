import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Featurelib1Component } from './featurelib1.component';

describe('Featurelib1Component', () => {
  let component: Featurelib1Component;
  let fixture: ComponentFixture<Featurelib1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Featurelib1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Featurelib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
