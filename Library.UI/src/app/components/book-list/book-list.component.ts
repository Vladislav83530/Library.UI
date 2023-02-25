import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IBook } from 'src/app/models/book';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books$: Observable<IBook[]>
  recommendedBooks$: Observable<IBook[]>
  loading = true
  @Output() changeToEditMode = new EventEmitter<number>()

  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.books$ = this.libraryService.getAllBooks().pipe(
      tap(() => this.loading = false)
    );

    this.recommendedBooks$ = this.libraryService.getRecommendedBooks().pipe(
      tap(() => this.loading = false)
    );
  }

  onClickEditBook(id: number) {
    this.changeToEditMode.emit(id);
  }

  afterSubmit() {
    this.books$ = this.libraryService.getAllBooks();
    this.recommendedBooks$ = this.libraryService.getRecommendedBooks();
  }
}
