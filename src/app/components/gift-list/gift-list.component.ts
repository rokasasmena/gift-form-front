import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit, OnChanges {
  @Input() selectedChild: any;
  @Output() giftAdded: EventEmitter<any> = new EventEmitter<any>();
  newGiftIndex: number | null = null;
  gifts: any[] = [];
  newGift: any = { name: '' };
  showNewGiftForm: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.retrieveGiftsFromLocalStorage();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedChild']) {
      this.getGiftsForSelectedChild();
    }
  }

  getGiftsForSelectedChild() {
    if (this.selectedChild && this.selectedChild.gifts) {
      this.gifts = [...this.selectedChild.gifts]; // Assign the selectedChild's gifts array to the local gifts array
    } else {
      this.gifts = [];
    }
  }

  toggleEditMode(gift: any) {
    gift.isEditing = !gift.isEditing;
  }

  saveGift(gift: any) {
    console.log("Updated gift:", gift);
    gift.isEditing = false;

    this.saveGiftsToLocalStorage();
  }

  cancelEdit(gift: any) {
    gift.isEditing = false;
  }

  showForm() {
    this.showNewGiftForm = true;
  }

  addNewGift() {
    const { name } = this.newGift;
    const newGift = { name, isEditing: false };
  
    this.gifts.unshift(newGift);
    this.newGiftIndex = 0;
    this.resetForm();
  
    setTimeout(() => {
      this.newGiftIndex = null;
    }, 1000);
  
    this.saveGiftsToLocalStorage();
  
    if (this.selectedChild && this.selectedChild.id) {
      const updatedChild = { ...this.selectedChild, gifts: [...this.gifts] };
      this.giftAdded.emit(updatedChild);
      this.selectedChild = updatedChild; // Update the selectedChild object with the new gifts array
    }
  
    this.giftAdded.emit(newGift); // Emit event to notify parent component
  
    console.log("Updated gifts array:", this.gifts);
  }

  resetForm() {
    this.newGift = { name: '' };
    this.showNewGiftForm = false;
  }

  saveGiftsToLocalStorage() {
    localStorage.setItem('gifts', JSON.stringify(this.gifts));
  }

  retrieveGiftsFromLocalStorage() {
    const storedGifts = localStorage.getItem('gifts');
    if (storedGifts) {
      this.gifts = JSON.parse(storedGifts);
    }
  }
}