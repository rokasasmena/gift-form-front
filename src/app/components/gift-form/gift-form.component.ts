import { Component } from '@angular/core';
import { Child } from 'src/app/dto/Child';
import { Gift } from 'src/app/dto/Gift';

@Component({
  selector: 'app-gift-form',
  templateUrl: './gift-form.component.html',
  styleUrls: ['./gift-form.component.scss']
})
export class GiftFormComponent {
  selectedChild: Child = new Child();

  onChildSelected(event: { child: any, index: number }) {
    this.selectedChild = event.child;
  }

  onGiftAdded(event: any) {
    const newGift: Gift = event as Gift;
  }
}