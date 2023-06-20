import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit {
  selectedChild: any;
  newGift: any = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.makeApiRequest();
  }

  addGift() {
    this.newGift.childId = this.selectedChild.id;
    this.dataService.addGift(this.newGift).subscribe(
      (response) => {
        console.log(response);
        this.newGift = {};
        this.getGiftsByChildId(this.selectedChild.id);
      },
      (error) => {
        console.log(error);
      }
    );
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

  makeApiRequest() {
    fetch('http://localhost:5209/gifts')
      .then(response => response.json())
      .then(data => {
        // Process the response data
        console.log("Data: ", data);
      })
      .catch(error => {
        // Handle any errors
        console.error("Error: ", error);
      });
  }
}