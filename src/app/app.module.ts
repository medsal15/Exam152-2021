import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthorModule } from './author-module/author.module';
import { WebcomicModule } from './webcomic-module/webcomic.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './components/portal/portal.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
  ],
  imports: [
    BrowserModule,
    AuthorModule,
    WebcomicModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
