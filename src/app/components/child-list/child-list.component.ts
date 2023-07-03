import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  @Input() selectedChild: any;
  @Output() childSelected: EventEmitter<{ child: any; index: number }> = new EventEmitter<{ child: any; index: number }>();
  newChildIndex: number | null = null;
  children: any[] = [];
  newChild: any = { name: '', lastName: '' };
  showNewChildForm: boolean = false;
  selectedChildIndex: number = -1;

  constructor(private dataService: DataService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.dataService.getChildren().subscribe({
      next: (response: any) => {
        console.log("API Response: ", response);
        this.children = response.map((child: any) => ({ ...child, isEditing: false }));
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  toggleEditMode(child: any) {
    child.isEditing = !child.isEditing;
  }

  saveChild(child: any) {
    console.log("Updated child:", child);
    child.isEditing = false;
  }

  cancelEdit(child: any) {
    child.isEditing = false;
  }

  showForm() {
    this.showNewChildForm = true;
  }

  addNewChild() {
    const { name, lastName } = this.newChild;
    const newChild = { name, lastName, isEditing: false };
  
    this.children.unshift(newChild);
    this.newChildIndex = 0;
    this.resetForm();
  
    setTimeout(() => {
      this.newChildIndex = null;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  
    console.log("Updated children array:", this.children);
  }

  selectChild(childIndex: { child: any, index: number }) {
    const { child, index } = childIndex;
    this.selectedChild = child;
    this.selectedChildIndex = index;
    if (child) {
      this.childSelected.emit({ child, index });
    }
  }

  resetForm() {
    this.newChild = { name: '', lastName: '' };
    this.showNewChildForm = false;
  }
}