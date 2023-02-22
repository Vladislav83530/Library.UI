import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IBook } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl= environment.apiUrl;

  constructor(private http: HttpClient){}

  public getAllBooks() : Observable<IBook[]>{
    return this.http.get<IBook[]>(`${this.apiUrl}/books`);
  }

  public getRecommendedBooks() : Observable<IBook[]>{
    return this.http.get<IBook[]>(`${this.apiUrl}/recommended`);
  }
}
