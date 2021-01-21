import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../models/author';
import { HttpClient } from '@angular/common/http';
import { SocialLink } from '../../models/sociallink';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private base_url = "https://localhost:5001";

  constructor(private http: HttpClient) { }


  getAuthors(search: string = "") : Observable<Array<Author>> {
    if (search.length) {
      search = `?name=${encodeURIComponent(search)}`;
    }
    return this.http.get<Array<Author>>(`${this.base_url}/authors${search}`);
  }

  getAuthor(id: number) : Observable<Author> {
    return this.http.get<Author>(`${this.base_url}/authors/${id}`);
  }

  addAuthor(author: Author) : Observable<Author> {
    return this.http.post<Author>(`${this.base_url}/authors`, author);
  }

  removeAuthor(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.base_url}/authors/${id}`);
  }

  updateAuthor(author: Author) : Observable<void> {
    return this.http.post<void>(`${this.base_url}/authors/${author.id}`, author);
  }

  linkAuthorWebcomic(author: number, webcomic: number) : Observable<void> {
    return this.http.get<void>(`${this.base_url}/authors/link/${author}/${webcomic}`);
  }

  unlinkAuthorWebcomic(author: number, webcomic: number) : Observable<void> {
    return this.http.get<void>(`${this.base_url}/authors/unlink/${author}/${webcomic}`);
  }

  linkAuthorSociallink(author: number, sociallink: SocialLink) : Observable<void> {
    return this.http.post<void>(`${this.base_url}/authors/social/${author}`, sociallink);
  }

  unlinkAuthorSociallink(sociallink: number) : Observable<void> {
    return this.http.delete<void>(`${this.base_url}/authors/social/${sociallink}`);
  }
}
