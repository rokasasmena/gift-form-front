import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent implements OnInit {
  children: any[] = [];
  selectedChild: any = {};
  newChild: any = {};

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit() {
    this.getChildren();
  }

  // Update the base URL of the API
  private apiBaseUrl = 'http://localhost:5000/api';
  

  getChildren() {
    const url = `${this.apiBaseUrl}/children`;
    console.log('apiBaseUrl: ', url);

    return this.http.get(url);
  }

  addChild() {
    this.dataService.addChild(this.newChild).subscribe(
      (response) => {
        console.log(response);
        this.newChild = {};
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectChild(child: any) {
    this.selectedChild = child;
    this.getGiftsByChildId(child.id);
  }

  getGiftsByChildId(childId: number) {
    this.dataService.getGiftsByChildId(childId).subscribe(
      (data: any) => {
        this.selectedChild.gifts = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}