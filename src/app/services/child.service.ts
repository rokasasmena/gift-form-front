import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private apiUrl = 'https://localhost:44308/children';

  constructor(private http: HttpClient) {}

  getChildren() {
    return this.http.get(this.apiUrl).pipe(
      map((response: any) => response?.result)
    );
  }

  addChild(child: any) {    
    return this.http.post(this.apiUrl, child);
  }
}