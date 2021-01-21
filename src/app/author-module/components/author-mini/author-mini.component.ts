import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-mini',
  templateUrl: './author-mini.component.html',
  styleUrls: ['./author-mini.component.css']
})
export class AuthorMiniComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() author: Author;
  @Output() readonly authorDelete = new EventEmitter<Author>();
  @Output() readonly authorSelect = new EventEmitter<Author>();

  delete() : void {
    if (this.author == null) return;
    if (!confirm(`Delete ${this.author.name}?`)) return;

    this.authorDelete.emit(this.author);
  }

  select() : void {
    this.authorSelect.emit(this.author);
  }
}
