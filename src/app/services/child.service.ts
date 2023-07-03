import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private apiUrl = 'https://localhost:44308/children';

  constructor(private http: HttpClient) {}

  getChildren() {
    return this.http.get(this.apiUrl);
  }

  addChild(child: any) {
    console.log("child: ", child);
    
    return this.http.post(this.apiUrl, child);
  }
}