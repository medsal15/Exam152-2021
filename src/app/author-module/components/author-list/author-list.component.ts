import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from 'src/app/author-module/models/author';
import { AuthorService } from '../../services/author/author.service';
import { AuthorEditComponent } from '../author-edit/author-edit.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit {

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.reloadAuthors();
  }

  authors: Author[];

  private search = '';

  @ViewChild(AuthorEditComponent) child: AuthorEditComponent;

  reloadAuthors(update: boolean = false) : void {
    this.authorService.getAuthors(this.search).subscribe(data => {
      if (!data) return;
      this.authors = data;
      if (update) {
        // Set the editor to the new author
        this.child.setAuthor(this.authors[this.authors.length - 1]);
      }
    }, error => console.error(error));
  }

  removeAuthor(author: Author) : void {
    this.authorService.removeAuthor(author.id).subscribe(() => this.reloadAuthors());
  }

  addAuthor(author: Author) : void {
    this.authorService.addAuthor(author).subscribe(() => this.reloadAuthors(true));
  }

  updateAuthor(author: Author) : void {
    this.authorService.updateAuthor(author).subscribe(() => this.reloadAuthors());
  }

  displayAuthor(author: Author) : void {
    this.child.setAuthor(author);
  }

  newAuthor() : void {
    this.child.setAuthor(null);
  }

  linkAuthorWebcomic([author, webcomic]: [number, number]) : void {
    this.authorService.linkAuthorWebcomic(author, webcomic).subscribe(() => this.reloadAuthors());
  }

  unlinkAuthorWebcomic([author, webcomic]: [number, number]) : void {
    this.authorService.unlinkAuthorWebcomic(author, webcomic).subscribe(() => this.reloadAuthors());
  }

  onSearchChange(event: Event) : void
  {
    let input = event.target as HTMLInputElement;

    this.search = input.value;

    this.reloadAuthors();
  }
}
