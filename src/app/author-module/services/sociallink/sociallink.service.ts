import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocialLink } from '../../models/sociallink';

@Injectable({
  providedIn: 'root'
})
export class SociallinkService {

  private base_url = "https://localhost:5001";

  constructor(private http: HttpClient) { }

  getSocialLinks(author: number) : Observable<Array<SocialLink>>
  {
    return this.http.get<Array<SocialLink>>(`${this.base_url}/sociallinks/author/${author}`);
  }

  getSocialLink(id: number) : Observable<SocialLink>
  {
    return this.http.get<SocialLink>(`${this.base_url}/sociallinks/${id}`);
  }

  addSocialLink(link: SocialLink) : Observable<SocialLink>
  {
    return this.http.post<SocialLink>(`${this.base_url}/sociallinks`, link);
  }

  removeSocialLink(id: number) : Observable<void>
  {
    return this.http.delete<void>(`${this.base_url}/sociallinks/${id}`);
  }

  updateSocialLink(link: SocialLink) : Observable<void>
  {
    return this.http.post<void>(`${this.base_url}/sociallinks/${link.id}`, link);
  }
}
