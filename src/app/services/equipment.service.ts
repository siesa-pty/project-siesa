import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, of } from 'rxjs'
import { Equipment } from '../model/equipment.model'
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  errorMsg!: string

  apiURL = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  getEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiURL}/equipment`, this.httpOptions)
  }

  getEquipment(id: string): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.apiURL}/equipment/find/${id}`, this.httpOptions)
  }

  getEquipmentByProject(project: string): Observable<Equipment[]> {
    return this.http.post<Equipment[]>(`${this.apiURL}/equipment/find/project`, { project }, this.httpOptions)
  }

  addEquipment(equipment: Equipment): Observable<Equipment[]> {
    return this.http.post<Equipment[]>(
      `${this.apiURL}/equipment`,
      equipment,
      this.httpOptions,
    )
  }

  deleteEquipment(id: string) {
    return this.http.delete(
      `${this.apiURL}/equipment/trash/${id}`,
      this.httpOptions,
    )
  }

  uploadFile(files: FileList) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name)
    }
    return this.http
      .post(`${this.apiURL}/equipment/upload`, formData)
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