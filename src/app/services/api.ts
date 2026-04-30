import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Gunakan HTTPS agar tidak diblokir browser
  private apiURL = 'https://layananapp.my.id/skintrack_api/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiURL + 'get_products.php');
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(this.apiURL + 'add_product.php', data);
  }
}