import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../model/user.model'
import { catchError, Observable, of } from 'rxjs'
import { Project } from '../model/project.model'
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  errorMsg!: string

  apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiURL}/project`, this.httpOptions);
  }

  addProject(project: Project): Observable<Project[]> {
    return this.http.post<Project[]>(`${this.apiURL}/project`, project, this.httpOptions);
  }
}
