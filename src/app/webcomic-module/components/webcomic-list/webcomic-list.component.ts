import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Webcomic } from '../../models/webcomic';
import { WebcomicService } from '../../services/webcomic/webcomic-service.service';
import { WebcomicEditComponent } from '../webcomic-edit/webcomic-edit.component';

@Component({
  selector: 'app-webcomic-list',
  templateUrl: './webcomic-list.component.html',
  styleUrls: ['./webcomic-list.component.css']
})
export class WebcomicListComponent implements OnInit {

  constructor(private webcomicService: WebcomicService) { }

  ngOnInit(): void {
    this.reloadWebcomics();
  }

  webcomics: Webcomic[];

  private search = '';

  @ViewChild(WebcomicEditComponent) child: WebcomicEditComponent;

  reloadWebcomics(update: boolean = false) : void {
    this.webcomicService.getWebcomics(this.search).subscribe(data => {
      if (!data) return;
      this.webcomics = data;
      if (update) {
        // Set the editor to the new webcomic
        this.child.setWebcomic(this.webcomics[this.webcomics.length - 1]);
      }
    }, error => console.error(error));
  }

  removeWebcomic(webcomic: Webcomic) : void {
    this.webcomicService.removeWebcomic(webcomic.id).subscribe(() => this.reloadWebcomics());
  }

  addWebcomic(webcomic: Webcomic) : void {
    this.webcomicService.addWebcomic(webcomic).subscribe(() => this.reloadWebcomics(true));
  }

  updateWebcomic(webcomic: Webcomic) : void {
    this.webcomicService.updateWebcomic(webcomic).subscribe(() => this.reloadWebcomics(true));
  }

  setWebcomicImage([id, image]: [number, FormData]) : void {
    this.webcomicService.setImage(id, image);
  }

  displayWebcomic(webcomic: Webcomic) : void {
    this.child.setWebcomic(webcomic);
  }

  newWebcomic() : void {
    this.child.setWebcomic(null);
  }

  linkWebcomicAuthor([webcomic, author]: [number, number]) : void {
    this.webcomicService.linkWebcomicAuthor(webcomic, author).subscribe(() => this.reloadWebcomics());
  }

  unlinkWebcomicAuthor([webcomic, author]: [number, number]) : void {
    this.webcomicService.unlinkWebcomicAuthor(webcomic, author).subscribe(() => this.reloadWebcomics());
  }

  onSearchChange(event: Event) : void {
    let input = event.target as HTMLInputElement;

    this.search = input.value;

    this.reloadWebcomics();
  }
}
