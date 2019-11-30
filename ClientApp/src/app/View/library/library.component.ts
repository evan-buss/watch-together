import { Component, OnInit } from '@angular/core';
import { MovieFile, LibraryService } from 'src/app/Component/library/library.service';
import { NotificationService } from 'src/app/Component/notifications/notification.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styles: [
    `.rotate {
        animation: spin 0.5s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
    }`
  ]
})
export class LibraryComponent implements OnInit {
  searchTerm: string = "";
  showModal: boolean = false;
  errorMessage: string = "";
  selectedMovie: MovieFile;
  loading: boolean = false;

  // Maintain a private complete list of movies
  private _movies: MovieFile[] = [];
  // Only show the movies that pass the searchTerm filter
  get movies(): MovieFile[] {
    if (this.searchTerm === "") return this._movies;
    return this._movies.filter((movie: MovieFile) => {
      if (movie.metadata) {
        return movie.metadata.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1;
      }
      return movie.path.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1;
    });
  }

  constructor(private libraryService: LibraryService,
    private notifService: NotificationService) { }

  scanLibrary(): void {
    this.loading = true;
    this.libraryService.scanLibrary()
      .subscribe(movies => { this._movies = movies; this.loading = false; });
  }

  handlePlay(movie: MovieFile) {
    if (movie.metadata) {
      this.notifService.addTemporary({ title: movie.metadata.title, message: "Now playing", movie: true, poster: movie.metadata.poster });
    } else {
      this.notifService.addTemporary({ title: "Unkown", message: "Now playing", movie: true });
    }
  }

  handleEdit(movie: MovieFile) {
    this.showModal = true;
    this.selectedMovie = movie;
  }

  updateMovies(movies: MovieFile[]) {
    this.showModal = false;
    this._movies = movies;
  }

  ngOnInit() {
    this.libraryService.getLibrary()
      .subscribe(
        (movies: MovieFile[]) => {
          this._movies = movies;
          if (this._movies.length === 0) {
            this.errorMessage = "You don't have any movies in your library. Add movies and rescan...";
          }
        },
        error => this.errorMessage = error
      );
  }
}