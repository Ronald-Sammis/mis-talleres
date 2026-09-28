import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taller } from '../models/taller.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TallerService {
  private apiUrl = environment.apiUrl || 'http://localhost:8080/api/talleres';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Taller[]> {
    return this.http.get<Taller[]>(this.apiUrl);
  }

  getById(id: number): Observable<Taller> {
    return this.http.get<Taller>(`${this.apiUrl}/${id}`);
  }

  create(taller: Taller): Observable<Taller> {
    return this.http.post<Taller>(this.apiUrl, taller);
  }

  update(id: number, taller: Taller): Observable<Taller> {
    return this.http.put<Taller>(`${this.apiUrl}/${id}`, taller);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
