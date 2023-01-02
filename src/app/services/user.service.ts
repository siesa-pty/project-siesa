import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../model/user.model'
import { catchError, Observable, of } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  errorMsg!: string

  apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<User>(
        `${this.apiURL}/user/login`,
        { username, password },
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          if (error.status === 500) {
            return of(this.errorMsg = `Ha colocado sus datos incorrectos.`);
          } else if (error.status === 401) {
            return of(this.errorMsg = `Ha colocado sus datos incorrectos.`);
          }
          return of(error.status);
        }),
      )
  }

  addUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(
      `${this.apiURL}/user/signup`,
      user,
      this.httpOptions,
    )
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${this.apiURL}/user/trash/${id}`,
      this.httpOptions,
    )
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/user/all`, this.httpOptions)
  }
}
