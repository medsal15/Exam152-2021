import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Webcomic } from '../../models/webcomic';

@Component({
  selector: 'app-webcomic-mini',
  templateUrl: './webcomic-mini.component.html',
  styleUrls: ['./webcomic-mini.component.css']
})
export class WebcomicMiniComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() webcomic: Webcomic;
  @Output() readonly webcomicSelect = new EventEmitter<Webcomic>();
  @Output() readonly webcomicDelete = new EventEmitter<Webcomic>();

  image() : string {
    if (!this.webcomic.picture) return '';
    return `data:image/png;base64,${this.webcomic.picture}`;
  }

  delete() : void {
    if (this.webcomic == null) return;
    if (!confirm(`Delete ${this.webcomic.name}?`)) return;

    this.webcomicDelete.emit(this.webcomic);
  }

  select() : void {
    this.webcomicSelect.emit(this.webcomic);
  }
}
