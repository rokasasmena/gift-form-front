import { Component } from '@angular/core';

@Component({
  selector: 'app-gift-form',
  templateUrl: './gift-form.component.html',
  styleUrls: ['./gift-form.component.scss']
})
export class GiftFormComponent {
  selectedChild: any;

  onChildSelected(event: { child: any, index: number }) {
    // Handle the selected child event in the GiftFormComponent
    console.log('Selected child:', event.child);
    console.log('Selected child index:', event.index);
  }
}