import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { BookListComponent } from '../components/book-list/book-list.component';
import { IBook } from '../models/book';
import { BookAddEdit } from '../models/book-add-edit';
import { IBookDetails } from '../models/book-details';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/books`);
  }

  public getRecommendedBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.apiUrl}/recommended`);
  }

  public getBook(id: number): Observable<IBookDetails> {
    return this.http.get<IBookDetails>(`${this.apiUrl}/books/${id}`);
  }

  public addBook(book: BookAddEdit) {
    book.id = 0;

    const header: HttpHeaders = new HttpHeaders();
    header.set('Accept', '*/*');
    header.set('Connection', 'keep-alive');
    header.set('Host', 'localhost:5000');
    header.set('User-Agent', 'myapp');
    header.set('Accept-Encoding', 'gzip, deflate, br');
    header.set('Content-Type', 'application/json');

    this.http.post("https://localhost:5000/api/books/save", book, { headers: header }).subscribe();
  }

  public editBook(id: number, params: any) {
    params.id = id;

    const header: HttpHeaders = new HttpHeaders();
    header.set('Accept', '*/*');
    header.set('Connection', 'keep-alive');
    header.set('Host', 'localhost:5000');
    header.set('User-Agent', 'myapp');
    header.set('Accept-Encoding', 'gzip, deflate, br');
    header.set('Content-Type', 'application/json')
    this.http.post("https://localhost:5000/api/books/save", params, { headers: header }).subscribe();
  }
}
