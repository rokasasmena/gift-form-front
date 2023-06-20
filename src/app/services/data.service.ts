import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getChildren() {
    return this.http.get(`${this.apiUrl}/children`);
  }

  getGiftsByChildId(childId: number) {
    return this.http.get(`${this.apiUrl}/children/${childId}/gifts`);
  }

  addChild(child: any) {
    return this.http.post(`${this.apiUrl}/children`, child);
  }

  addGift(gift: any) {
    return this.http.post(`${this.apiUrl}/gifts`, gift);
  }
}