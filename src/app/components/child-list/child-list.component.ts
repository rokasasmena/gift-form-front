import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { BehaviorSubject } from 'rxjs';
import { Child } from 'src/app/dto/Child';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  @Input() selectedChild: any;
  @Output() childSelected: EventEmitter<{ child: any; index: number }> = new EventEmitter<{ child: any; index: number }>();
  newChildIndex: number | null = null;
  newChild: any = { name: '', lastName: '' };
  showNewChildForm: boolean = false;
  selectedChildIndex: number = -1;
  highlightedRowIndex: number | null = null;

  children$: BehaviorSubject<Child[]> = new BehaviorSubject([new Child()]);
  dataSource = new MatTableDataSource<Child>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getChildren();
    this.children$.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getChildren() {
    this.dataService.getChildren().subscribe({
      next: (response: any) => {
        var data = response.map((child: Child) => ({ ...child, isEditing: false }));
        this.children$.next(data);
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  toggleEditMode(child: Child) {
    child.isEditing = !child.isEditing;
  }

  saveChild(child: Child) {
    child.isEditing = false;
  }

  cancelEdit(child: Child) {
    child.isEditing = false;
  }

  deleteChild(child: Child) {
    const childIndex = this.dataSource.data.findIndex((c) => c.id === child.id);
    if (childIndex !== -1) {
      this.children$.next([
        ...this.dataSource.data.slice(0, childIndex),
        ...this.dataSource.data.slice(childIndex + 1)
      ]);
      this.resetForm();
    }
  }

  showForm() {
    this.showNewChildForm = true;
  }

  addNewChild() {
    const { name, lastName } = this.newChild;
    const newChild = { name, lastName, gifts: [], isEditing: false };
  
    this.dataService.addChild(newChild).subscribe({
      next: (response: any) => {
        const updatedData = [response, ...this.dataSource.data];
        this.children$.next(updatedData);
        this.resetForm();
        this.selectedChild = response;
      },
      error: (error: any) => {
        console.error('Failed to add new child:', error);
      }
    });
  }
  
  selectChild(childIndex: { child: Child; index: number }) {
    const { child, index } = childIndex;
    this.selectedChild = { ...child };
    this.selectedChildIndex = index;
    if (child) {
      this.childSelected.emit({ child: this.selectedChild, index });
    }
  }

  resetForm() {
    this.newChild = { name: '', lastName: '' };
    this.showNewChildForm = false;
  }

  highlightRow(index: number) {
    this.highlightedRowIndex = index;
  }
  
  unhighlightRow(index: number) {
    if (this.highlightedRowIndex === index) {
      this.highlightedRowIndex = null;
    }
  }
}