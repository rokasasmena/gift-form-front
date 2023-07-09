import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftFormComponent } from './gift-form.component';
import { ChildListComponent } from '../child-list/child-list.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('GiftFormComponent', () => {
  let component: GiftFormComponent;
  let fixture: ComponentFixture<GiftFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GiftFormComponent, ChildListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(GiftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
