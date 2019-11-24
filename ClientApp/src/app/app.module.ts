import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './Views/home/home.component';
import { FetchDataComponent } from './Views/fetch-data/fetch-data.component';
import { FormComponent } from './Views/home/form/form.component';
import { MovieComponent } from './Views/movie/movie.component';
import { LibraryComponent } from './Views/library/library.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { ChatComponent } from './Components/chat/chat.component';
import { MessageComponent } from './Components/chat/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    FormComponent,
    MovieComponent,
    LibraryComponent,
    NotificationsComponent,
    ChatComponent,
    MessageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'movie', component: MovieComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
