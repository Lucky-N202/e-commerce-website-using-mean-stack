import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = 'localhost:7700/api/v1/customer';
  constructor(private http: HttpClient) {}

  createOrder(order: any) {
    return this.http.post('/orders', order);
  }

  getOrder(orderId: string) {
    return this.http.get(`/orders/${orderId}`);
  }

  updateOrderStatus(orderId: string, status: string) {
    return this.http.patch(`/orders/${orderId}`, { status });
  }
}
