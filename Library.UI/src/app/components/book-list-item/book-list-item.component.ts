import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBook } from 'src/app/models/book';


@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css'],
})
export class BookListItemComponent {
  @Input() book: IBook
  @Output() onEditClick = new EventEmitter<number>();

  editBook(){
    this.onEditClick.emit(this.book.id)
  }

}
