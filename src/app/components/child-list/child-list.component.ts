import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChangeDetectorRef } from '@angular/core';
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

  children$: BehaviorSubject<Child[]> = new BehaviorSubject([new Child()]);
  dataSource = new MatTableDataSource<Child>();

  constructor(private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getChildren();
    this.children$.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  getChildren() {
    this.dataService.getChildren().subscribe({
      next: (response: any) => {
        console.log("API Response: ", response);
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
    console.log("Updated child:", child);
    child.isEditing = false;
  }

  cancelEdit(child: Child) {
    child.isEditing = false;
  }

  showForm() {
    this.showNewChildForm = true;
  }

  addNewChild() {
    const { name, lastName } = this.newChild;
    const newChild = { id: this.dataSource.data.length + 1, name, lastName, gifts: [], isEditing: false };

    var data = [newChild, ...this.dataSource.data];
    this.newChildIndex = 0;
    this.resetForm();
  
    setTimeout(() => {
      this.newChildIndex = null;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  
    this.children$.next(data);
    this.selectedChild = { ...newChild }; // Update the selectedChild object with the new child
  
    console.log("Updated children array:", this.dataSource.data);
  }
  
  selectChild(childIndex: { child: Child; index: number }) {
    const { child, index } = childIndex;
    this.selectedChild = { ...child }; // Create a copy of the child object
    this.selectedChildIndex = index;
    if (child) {
      this.childSelected.emit({ child: this.selectedChild, index });
    }
  }

  resetForm() {
    this.newChild = { name: '', lastName: '' };
    this.showNewChildForm = false;
  }
}