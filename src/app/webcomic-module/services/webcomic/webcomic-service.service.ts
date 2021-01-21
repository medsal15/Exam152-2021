import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Webcomic } from '../../models/webcomic';

@Injectable({
  providedIn: 'root'
})
export class WebcomicService {

  private base_url = "https://localhost:5001";

  constructor(private http: HttpClient) { }

  getWebcomics(search: string = "") : Observable<Array<Webcomic>> {
    return this.http.get<Array<Webcomic>>(`${this.base_url}/webcomics?name=${encodeURIComponent(search)}`);
  }

  getWebcomic(id: number) : Observable<Webcomic> {
    return this.http.get<Webcomic>(`${this.base_url}/webcomics/${id}`);
  }

  addWebcomic(webcomic: Webcomic) : Observable<Webcomic> {
    return this.http.post<Webcomic>(`${this.base_url}/webcomics`, webcomic);
  }

  removeWebcomic(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.base_url}/webcomics/${id}`);
  }

  updateWebcomic(webcomic: Webcomic) : Observable<void> {
    return this.http.post<void>(`${this.base_url}/webcomics/${webcomic.id}`, webcomic);
  }

  updateWebcomicImage(id: number, image: FormData) : Observable<void> {
    return this.http.post<void>(`${this.base_url}/webcomics/${id}/image`, image);
  }

  linkWebcomicAuthor(webcomic: number, author: number) : Observable<void> {
    return this.http.get<void>(`${this.base_url}/webcomics/link/${webcomic}/${author}`);
  }

  unlinkWebcomicAuthor(webcomic: number, author: number) : Observable<void> {
    return this.http.get<void>(`${this.base_url}/webcomics/unlink/${webcomic}/${author}`);
  }

  setImage(id: number, image: FormData) : Observable<void> {
    return this.http.post<void>(`${this.base_url}/webcomics/${id}/image`, image);
  }
}
