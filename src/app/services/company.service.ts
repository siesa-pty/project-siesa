import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs'
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  errorMsg!: string

  apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  addProject(company: Company): Observable<Company[]> {
    return this.http.post<Company[]>(
      `${this.apiURL}/company`,
      company,
      this.httpOptions,
    )
  }

  deleteCompany(id: string) {
    return this.http.delete(
      `${this.apiURL}/company/trash/${id}`,
      this.httpOptions,
    )
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiURL}/company/all`, this.httpOptions)
  }

  uploadFile(files: FileList) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name)
    }
    return this.http
      .post(`${this.apiURL}/company/upload`, formData)
      .pipe(map((response) => response))
      .pipe(
        catchError((error) => {
          if (error.status === 413) {
            return of(
              (this.errorMsg = `El tamaño máximo por archivo debe ser menor a 500 kb.`),
            )
          }
          return of(error.status)
        }),
      )
  }
}
