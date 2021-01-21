import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Author } from '../../models/author';
import { WebcomicService } from '../../../webcomic-module/services/webcomic/webcomic-service.service';
import { Webcomic } from '../../../webcomic-module/models/webcomic';
import { SocialLink } from '../../models/sociallink';
import { SociallinkService } from '../../services/sociallink/sociallink.service';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  constructor(
    private webcomicService: WebcomicService,
    private sociallinksService: SociallinkService,
  ) { }

  @Output() readonly authorUpdate = new EventEmitter<Author>();
  @Output() readonly authorCreate = new EventEmitter<Author>();
  @Output() readonly authorWebcomicLink = new EventEmitter<[number, number]>();
  @Output() readonly authorWebcomicUnlink = new EventEmitter<[number, number]>();

  fake_author: Author = {
    name: '',
    id: 0,
    webcomics: [],
    socialLinks: [],
  };

  private base_webcomics: number[] = [];
  private added_sociallinks: SocialLink[] = [];
  private changed_sociallinks: SocialLink[] = [];
  private removed_sociallinks: SocialLink[] = [];

  webcomics: Webcomic[];

  get sociallinks() : SocialLink[] {
    return this.fake_author.socialLinks;
  }

  ngOnInit(): void {
    this.reloadWebcomics();
  }

  reloadWebcomics() : void {
    this.webcomicService.getWebcomics().subscribe(data => {
      if (data) this.webcomics = data;
    }, error => console.error(error));
  }

  reloadSociallinks() : void {
    this.sociallinksService.getSocialLinks(this.fake_author.id).subscribe(data => {
      if (data) this.fake_author.socialLinks = data;
    }, error => console.error(error));
  }

  onNameChange(event: Event) : void {
    this.fake_author.name = (event.target as HTMLInputElement).value;
  }

  onWebcomicChange(selected: number) : void {
    if (this.fake_author.webcomics.includes(selected)) {
      let index = this.fake_author.webcomics.indexOf(selected);
      this.fake_author.webcomics.splice(index, 1);
    } else {
      this.fake_author.webcomics.push(selected);
    }
  }

  createSocialLink() : void {
    let created: SocialLink = {
      id: 0,
      authorId: this.fake_author.id,
      url: ''
    };

    if (this.fake_author.socialLinks.length) {
      created.id = Math.max(...this.fake_author.socialLinks.map(l => l.id)) + 1;
    }

    this.added_sociallinks.push(created);
    this.fake_author.socialLinks.push(created);
  }

  removeSocialLink(id: number) : void {
    let deleted = this.fake_author.socialLinks.find(link => link.id == id);

    this.fake_author.socialLinks = this.fake_author.socialLinks.filter(link => link.id != id);

    if (this.added_sociallinks.includes(deleted)) {
      this.added_sociallinks = this.added_sociallinks.filter(link => link.id != id);
    } else {
      this.changed_sociallinks = this.changed_sociallinks.filter(link => link.id != id);
      this.removed_sociallinks.push(deleted);
    }
  }

  onSocialLinkChange(id: number, event: Event) : void {
    let url = (event.target as HTMLInputElement).value,
    changed = this.sociallinks.find(link => link.id == id);

    changed.url = url;

    if (!this.added_sociallinks.includes(changed) && !this.changed_sociallinks.includes(changed)) {
      this.changed_sociallinks.push(changed);
    }
  }

  saveAuthor() : void {
    if (this.fake_author.id == 0) {
      this.authorCreate.emit(this.fake_author);
    } else {
      this.authorUpdate.emit(this.fake_author);
      let webcomics_add = this.fake_author.webcomics.filter(w => !this.base_webcomics.includes(w)),
      webcomics_remove = this.base_webcomics.filter(w => !this.fake_author.webcomics.includes(w));

      for (const webcomic of webcomics_add) {
        this.authorWebcomicLink.emit([this.fake_author.id, webcomic]);
      }
      for (const webcomic of webcomics_remove) {
        this.authorWebcomicUnlink.emit([this.fake_author.id, webcomic]);
      }

      this.added_sociallinks.forEach(link => this.sociallinksService.addSocialLink(link).subscribe());
      this.changed_sociallinks.forEach(link => this.sociallinksService.updateSocialLink(link).subscribe());
      this.removed_sociallinks.forEach(link => this.sociallinksService.removeSocialLink(link.id).subscribe());
    }

    this.base_webcomics = [...this.fake_author.webcomics];
  }

  public setAuthor(author: Author) : void {
    if (author == null) {
      this.fake_author.name = '';
      this.fake_author.id = 0;
      this.fake_author.webcomics = [];
    } else {
      this.fake_author.name = author.name;
      this.fake_author.id = author.id;
      this.fake_author.webcomics = [...author.webcomics];
    }
    this.reloadWebcomics();
    this.reloadSociallinks();

    this.base_webcomics = [...this.fake_author.webcomics];
  }
}
