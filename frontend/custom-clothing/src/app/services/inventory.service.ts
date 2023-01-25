import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class InventoryService {
  baseUrl = 'localhost:7700/api/v1/customer';
  constructor(private http: HttpClient) {}

  getInventory() {
    return this.http.get('/api/inventory');
  }

  updateInventory(productId: string, quantity: number) {
   return this.http.patch(`/api/inventory/${productId}`, { quantity });
  }
}
