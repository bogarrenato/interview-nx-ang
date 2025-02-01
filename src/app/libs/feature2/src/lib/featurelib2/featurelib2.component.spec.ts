import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Featurelib2Component } from './featurelib2.component';

describe('Featurelib2Component', () => {
  let component: Featurelib2Component;
  let fixture: ComponentFixture<Featurelib2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Featurelib2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Featurelib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
