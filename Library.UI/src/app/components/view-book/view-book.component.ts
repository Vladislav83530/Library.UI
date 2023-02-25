import { Component, Input, OnInit } from '@angular/core';
import { IBookDetails } from 'src/app/models/book-details';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ViewBookComponent implements OnInit {
  @Input() book$: Observable<IBookDetails>
  @Input() id: number

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private libraryService: LibraryService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.book$ = this.libraryService.getBook(this.id);
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}
