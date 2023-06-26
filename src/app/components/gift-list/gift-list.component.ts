import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnChanges {
  @Input() selectedChild: any;
  gifts: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedChild'] && this.selectedChild) {
      this.gifts = this.selectedChild.gifts;
    }
  }
}