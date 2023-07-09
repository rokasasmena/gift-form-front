import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildListComponent } from './child-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChildListComponent', () => {
  let component: ChildListComponent;
  let fixture: ComponentFixture<ChildListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, MatTableModule, MatIconModule, MatFormFieldModule, FormsModule, MatInputModule, BrowserAnimationsModule],
      declarations: [ChildListComponent],
    });
    fixture = TestBed.createComponent(ChildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a child when clicked', () => {
    const childRow = fixture.nativeElement.querySelector('tr');
    childRow.click();
    expect(component.selectedChildIndex).toBe(0);
  });

  it('should add a new child', () => {
    component.showNewChildForm = true;
    component.newChild = { name: 'Tomas', lastName: 'Kulkauskas' };
    const addButton = fixture.nativeElement.querySelector('.add-new-child');
    addButton.click();
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(1);
  });
});