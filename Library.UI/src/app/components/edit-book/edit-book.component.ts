import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @Input() selectedEditBookId: number;
  @Output() onSubmitted = new EventEmitter();
  formBook: FormGroup;
  isEditMode = false;
  submitted = false;
  Image: string;

  private clearFormState = {
    title: '',
    author: '',
    cover: '',
    content: '',
    genre: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
  ) { }

  ngOnInit() {
    this.formBook = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['', Validators.required],
      content: ['', Validators.required],
      genre: ['', Validators.required]
    }, {});
  }

  onEnableEditMode(id: number) {
    this.isEditMode = true;
    this.selectedEditBookId = id;

    this.libraryService.getBook(this.selectedEditBookId).pipe(map((x) => {
      return {
        title: x.title,
        author: x.author,
        cover: x.cover,
        content: x.content,
        genre: x.genre,
      }
    })).subscribe(
      {
        next: (book) => {
          this.formBook.setValue(book);
          this.Image = book.cover;
        }
      });
  }

  disableEditMode(form: HTMLFormElement) {
    this.isEditMode = false;
    this.selectedEditBookId = 0;
    this.clearForm(form);
    this.Image = '';
  }

  get f() { return this.formBook.controls; }

  onSubmit(form: HTMLFormElement) {
    this.submitted = true;

    if (this.formBook.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.libraryService.editBook(this.selectedEditBookId, this.formBook.value);
    }
    else {
      this.libraryService.addBook(this.formBook.value);
    }
    this.afterSubmit();
    this.clearForm(form)
  }

  clearForm(form: HTMLFormElement) {
    form.reset()
    this.formBook.setValue(this.clearFormState);
    this.Image = "";
    this.isEditMode = false;
    this.selectedEditBookId = 0;
  }

  afterSubmit() {
    this.onSubmitted.emit();
    this.isEditMode = false;
    this.selectedEditBookId = 0;
  }

  onFileChange(event: any, fileinput: HTMLInputElement) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (!/['.jpg','.png','.jpeg']$/.test(file.name)) {
        fileinput.value = "";
        console.log('Invalid file');
        return;
      }
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formBook.patchValue({
          cover: reader.result
        });
        this.Image = reader.result!.toString();
      };
    }
  }
}
