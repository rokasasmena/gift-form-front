import { Component } from '@angular/core';
import { Child } from './dto/Child';
import { Gift } from './dto/Gift';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedChild: Child = new Child();

  onChildSelected(event: { child: any, index: number }) {
    this.selectedChild = event.child;
  }

  onGiftAdded(event: any) {
    const newGift: Gift = event as Gift;
  }
}