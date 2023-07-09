import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Child } from 'src/app/dto/Child';
import { Gift } from 'src/app/dto/Gift';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.scss']
})
export class GiftListComponent implements OnInit, OnChanges {
  @Input() selectedChild: Child = new Child();
  gifts: Gift[] = [];
  newGift: Gift = { id: 0, name: '', childId: 0, isEditing: false };
  showNewGiftForm: boolean = false;

  constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.getGiftsUpdated().subscribe((gifts) => {
    this.selectedChild.gifts = gifts;
  });

}
  
  ngOnChanges() {
    if (this.selectedChild && this.selectedChild.id) {
      this.getGiftsForSelectedChild();
    }
  }

  getGiftsForSelectedChild() {
    if (this.selectedChild) {
      this.dataService
        .getGiftsByChildId(this.selectedChild.id)
        .pipe(
          tap((gifts: Gift[]) => {
            this.selectedChild.gifts = gifts;
          }),
          catchError((error: any) => {
            console.error('Failed to retrieve gifts:', error);
            return [];
          })
        )
        .subscribe();
    }
  }

  toggleEditMode(gift: Gift) {
    gift.isEditing = !gift.isEditing;
  }

  saveGift(gift: Gift) {
    gift.isEditing = false;
  
    this.dataService.updateGift(gift).pipe(
      tap((updatedGift: Gift) => {
        console.log('Gift updated successfully:', updatedGift);
      }),
      catchError((error: any) => {
        console.error('Failed to update gift:', error);
        return [];
      })
    ).subscribe();
  }

  cancelEdit(gift: Gift) {
    gift.isEditing = false;
  }

  deleteGift(giftId: number) {
    this.dataService.deleteGift(giftId).subscribe({
      next: () => {
        console.log('Gift deleted successfully');
        this.getGiftsForSelectedChild();
      },
      error: (error) => {
        console.error('Failed to delete gift:', error);
      }
    });
  }

  showForm() {
    this.showNewGiftForm = true;
  }

  addNewGift() {
    if (!this.selectedChild || !this.selectedChild.id) return;
  
    const { name } = this.newGift;
    const newGift: Gift = { id: 0, name, childId: this.selectedChild.id, isEditing: false };
  
    this.dataService.createGift(newGift).pipe(
      tap((createdGift: Gift) => {
        console.log('Gift created successfully:', createdGift);
        this.selectedChild?.gifts?.unshift(createdGift);
      }),
      catchError((error: any) => {
        console.error('Failed to create gift:', error);
        return [];
      })
    ).subscribe();
  
    this.resetForm();
  }

  resetForm() {
    this.newGift = { id: 0, name: '', childId: 0, isEditing: false };
    this.showNewGiftForm = false;
  }
}