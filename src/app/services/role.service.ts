import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  errorMsg!: string

  apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  addRole(role: Role): Observable<Role[]> {
    return this.http.post<Role[]>(
      `${this.apiURL}/role`,
      role,
      this.httpOptions,
    )
  }

  deleteRole(id: string) {
    return this.http.delete(
      `${this.apiURL}/role/trash/${id}`,
      this.httpOptions,
    )
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiURL}/role/all`, this.httpOptions)
  }
}
