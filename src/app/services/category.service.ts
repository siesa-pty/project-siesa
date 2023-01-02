import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  errorMsg!: string

  apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  addCategory(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(
      `${this.apiURL}/category`,
      category,
      this.httpOptions,
    )
  }

  deleteCategory(id: string) {
    return this.http.delete(
      `${this.apiURL}/category/trash/${id}`,
      this.httpOptions,
    )
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURL}/category/all`, this.httpOptions)
  }
}
