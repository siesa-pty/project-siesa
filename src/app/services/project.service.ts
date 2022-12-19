import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs'
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
    return this.http.get<Project[]>(`${this.apiURL}/project`, this.httpOptions)
  }

  addProject(project: Project): Observable<Project[]> {
    return this.http.post<Project[]>(
      `${this.apiURL}/project`,
      project,
      this.httpOptions,
    )
  }

  uploadFile(files: FileList) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name)
    }
    return this.http
      .post(`${this.apiURL}/project/upload`, formData)
      .pipe(map((response) => response))
      .pipe(
        catchError((error) => {
          if (error.status === 413) {
            return of(this.errorMsg = `El tamaño máximo por archivo debe ser menor a 5mb.`);
          } 
          return of(error.status);
        }),
      )
  }
}