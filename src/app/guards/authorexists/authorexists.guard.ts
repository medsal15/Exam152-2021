import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorService } from 'src/app/author-module/services/author/author.service';
import { Author } from 'src/app/author-module/models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorexistsGuard implements CanActivate {
  constructor(private authorService: AuthorService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this.authorService.getAuthors().pipe(
      map<Author[], boolean>(data => data != null && data.length > 0)
    );
  }

}
