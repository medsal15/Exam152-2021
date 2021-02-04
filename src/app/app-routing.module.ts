import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { AuthorListComponent } from './author-module/components/author-list/author-list.component';
import { WebcomicListComponent } from './webcomic-module/components/webcomic-list/webcomic-list.component';
import { AuthorexistsGuard } from './guards/authorexists/authorexists.guard';

const routes: Routes = [
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      {
        path: 'authors',
        component: AuthorListComponent
      },
      {
        path: 'webcomics',
        component: WebcomicListComponent,
        canActivate: [
          AuthorexistsGuard,
        ]
      }
    ],
  },
  {
    path: '**',
    redirectTo: '/portal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
