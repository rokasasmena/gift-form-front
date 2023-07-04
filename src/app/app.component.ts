import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedChild: any;

  onChildSelected(event: { child: any, index: number }) {
    this.selectedChild = event.child;
    console.log('Selected child:', this.selectedChild);
  }
}