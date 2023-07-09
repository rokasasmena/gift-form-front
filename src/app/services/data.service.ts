import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gift } from 'src/app/dto/Gift';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:44308';

  private giftsUpdated = new BehaviorSubject<Gift[]>([]);

getGiftsUpdated(): Observable<Gift[]> {
  return this.giftsUpdated.asObservable();
}

  constructor(private http: HttpClient) {}

  getChildren() {
    return this.http.get(`${this.apiUrl}/children`).pipe(
      map((response: any) => response?.result)
    );
  }

  getGiftsByChildId(childId: number): BehaviorSubject<Gift[]> {
    const gifts$ = new BehaviorSubject<Gift[]>([]);
    this.http.get<Gift[]>(`${this.apiUrl}/gift/${childId}/child`)
      .pipe(
        map((response: any) => response?.result)
      )
      .subscribe({
        next: (gifts: Gift[]) => {
          gifts$.next(gifts);
        },
        error: (error: any) => {
          console.error('Failed to retrieve gifts:', error);
        }
      });
    return gifts$;
  }

  addChild(child: any) {
    return this.http.post(`${this.apiUrl}/children`, child);
  }

  addGift(gift: Gift) {
    return this.http.post<Gift>(`${this.apiUrl}/gift`, gift);
  }

  updateGift(gift: Gift) {
    return this.http.put<Gift>(`${this.apiUrl}/gift/${gift.id}`, gift);
  }

  createGift(gift: Gift) {
    return this.http.post<Gift>(`${this.apiUrl}/gift`, gift);
  }

  deleteGift(giftId: number) {
    return this.http.delete(`${this.apiUrl}/gift/${giftId}`).pipe(
      tap(() => {
        const updatedGifts = this.giftsUpdated.getValue().filter((gift) => gift.id !== giftId);
        this.giftsUpdated.next(updatedGifts);
      }),
      catchError((error: any) => {
        console.error('Failed to delete gift:', error);
        return throwError(error);
      })
    );
  }
}