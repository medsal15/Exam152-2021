import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WebcomicListComponent } from './components/webcomic-list/webcomic-list.component';
import { WebcomicMiniComponent } from './components/webcomic-mini/webcomic-mini.component';
import { WebcomicEditComponent } from './components/webcomic-edit/webcomic-edit.component';

@NgModule({
  declarations: [
    WebcomicMiniComponent,
    WebcomicListComponent,
    WebcomicEditComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class WebcomicModule { }
