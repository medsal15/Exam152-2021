import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorMiniComponent } from './components/author-mini/author-mini.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorMiniComponent,
    AuthorEditComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class AuthorModule { }
