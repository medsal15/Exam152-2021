import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/author-module/models/author';
import { AuthorService } from 'src/app/author-module/services/author/author.service';
import { State } from '../../enums/state.enum';
import { Webcomic } from '../../models/webcomic';

@Component({
  selector: 'app-webcomic-edit',
  templateUrl: './webcomic-edit.component.html',
  styleUrls: ['./webcomic-edit.component.css'],
})
export class WebcomicEditComponent implements OnInit {

  constructor(
    private authorService: AuthorService,
  ) { }

  @Output() readonly webcomicUpdate = new EventEmitter<Webcomic>();
  @Output() readonly webcomicSetImage = new EventEmitter<[number, FormData]>();
  @Output() readonly webcomicCreate = new EventEmitter<Webcomic>();
  @Output() readonly webcomicAuthorLink = new EventEmitter<[number, number]>();
  @Output() readonly webcomicAuthorUnlink = new EventEmitter<[number, number]>();

  fake_webcomic: Webcomic = {
    name: '',
    url: '',
    id: 0,
    picture: '',
    state: null,
    authors: [],
  };

  private base_authors: number[] = [];

  authors: Author[];

  get states() : [number, string][] {
    let states = [];
    for (let s in State) {
      if (isNaN(+s)) continue;
      states.push([s, State[s]]);
    }
    return states;
  }

  ngOnInit(): void {
    this.reloadAuthors();
  }

  reloadAuthors() : void {
    this.authorService.getAuthors().subscribe(data => {
      if (data) this.authors = data;
    }, error => console.error(error));
  }

  onNameChange(event: Event) : void {
    this.fake_webcomic.name = (event.target as HTMLInputElement).value;
  }

  onUrlChange(event: Event) : void {
    this.fake_webcomic.url = (event.target as HTMLInputElement).value;
  }

  onPictureChange(event: Event) : void {
    let file_input = event.target as HTMLInputElement,
    files = file_input.files;

    if (!files.length) return;

    let file = files[0];
    if (/^image\//.test(file.type)) return;

    let formdata = new FormData;
    formdata.set('file', file);
    this.webcomicSetImage.emit([this.fake_webcomic.id, formdata]);
    file_input.value = null;
  }

  onStateSelect(state: number) : void {
    this.fake_webcomic.state = +state;
  }

  onAuthorChange(selected: number) : void {
    if (this.fake_webcomic.authors.includes(selected)) {
      let index = this.fake_webcomic.authors.indexOf(selected);
      this.fake_webcomic.authors.splice(index, 1);
    } else {
      this.fake_webcomic.authors.push(selected);
    }
  }

  saveWebcomic() : void {
    // Needed because select is broken with events
    this.fake_webcomic.state = +(document.getElementById('state') as HTMLSelectElement).value;

    if (this.fake_webcomic.id == 0) {
      this.webcomicCreate.emit(this.fake_webcomic);
    } else {
      this.webcomicUpdate.emit(this.fake_webcomic);
      let authors_add = this.fake_webcomic.authors.filter(a => !this.base_authors.includes(a)),
      authors_remove = this.base_authors.filter(a => !this.fake_webcomic.authors.includes(a));

      for (const author of authors_add) {
        this.webcomicAuthorLink.emit([this.fake_webcomic.id, author]);
      }
      for (const author of authors_remove) {
        this.webcomicAuthorUnlink.emit([this.fake_webcomic.id, author]);
      }
    }

    this.base_authors = [...this.fake_webcomic.authors];
  }

  public setWebcomic(webcomic: Webcomic) : void {
    if (webcomic == null) {
      this.fake_webcomic.name = '';
      this.fake_webcomic.url = '';
      this.fake_webcomic.id = 0;
      this.fake_webcomic.state = 0;
      this.fake_webcomic.authors = [];
    } else {
      this.fake_webcomic.name = webcomic.name;
      this.fake_webcomic.url = webcomic.url;
      this.fake_webcomic.id = webcomic.id;
      this.fake_webcomic.state = webcomic.state;
      this.fake_webcomic.authors = webcomic.authors;
    }

    this.reloadAuthors();

    this.base_authors = [...this.fake_webcomic.authors];
  }
}
