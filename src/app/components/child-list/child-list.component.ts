import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  children: any[] = [];
  selectedChild: any = {};
  newChild: any = {};

  @Output() childSelected = new EventEmitter<any>();

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.getChildren();
  }

  getChildren() {
    this.dataService.getChildren().subscribe({
      next: (response: any) => {
        this.children = response.children;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  selectChild(child: any) {
    this.selectedChild = child;
    this.childSelected.emit(child);
  }
}