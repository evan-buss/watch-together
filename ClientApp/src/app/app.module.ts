import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { HomeComponent } from './View/home/home.component';
import { FetchDataComponent } from './View/fetch-data/fetch-data.component';
import { FormComponent } from './View/home/form/form.component';
import { MovieComponent } from './View/movie/movie.component';
import { LibraryComponent } from './View/library/library.component';
import { NotificationsComponent } from './Component/notifications/notifications.component';
import { ChatComponent } from './Component/chat/chat.component';
import { MessageComponent } from './Component/chat/message/message.component';
import { AuthGuard } from './Service/auth.guard';
import { HostGuard } from './Service/host.guard';
import { MetadataModalComponent } from './Component/library/metadata-modal/metadata-modal.component';
import { LibraryMovieCardComponent } from './Component/library/library-movie-card/library-movie-card.component';
import { MetadataItemComponent } from './Component/library/metadata-modal/metadata-item/metadata-item.component';
import { PaginationComponent } from './Component/library/metadata-modal/pagination/pagination.component';
import { DefaultNotificationComponent } from './Component/notifications/default-notification/default-notification.component';
import { MovieNotificationComponent } from './Component/notifications/movie-notification/movie-notification.component';
import { VideoPlayerComponent } from './Component/video-player/video-player.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movie', canActivate: [AuthGuard], component: MovieComponent },
  { path: 'library', canActivate: [AuthGuard, HostGuard], component: LibraryComponent },
  { path: 'fetch-data', component: FetchDataComponent },
];

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
    MetadataModalComponent,
    LibraryMovieCardComponent,
    MetadataItemComponent,
    PaginationComponent,
    DefaultNotificationComponent,
    MovieNotificationComponent,
    VideoPlayerComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
