import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IBook } from 'src/app/models/book';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books$: Observable<IBook[]>
  recommendedBooks$: Observable<IBook[]>
  loading = true

  constructor(private libraryService: LibraryService){}

  ngOnInit(): void {
    this.books$ = this.libraryService.getAllBooks().pipe(
      tap(()=>this.loading = false)
      );

    this.recommendedBooks$ = this.libraryService.getRecommendedBooks().pipe(
      tap(()=>this.loading = false)
      );
  }
}
