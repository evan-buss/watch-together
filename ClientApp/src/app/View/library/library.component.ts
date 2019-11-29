import { Component, OnInit } from '@angular/core';
import { MovieFile, LibraryService } from 'src/app/Component/library/library.service';
import { NotificationService } from 'src/app/Component/notifications/notification.service';
import { error } from 'util';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
})
export class LibraryComponent implements OnInit {
  searchTerm: string = "";
  showModal: boolean = false;
  errorMessage: string = "";
  selectedMovie: MovieFile;

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
    // TODO: Make button rotate while loading. Scanning often takes a bit of time. Make it interactive.
    this.libraryService.scanLibrary().subscribe(movies => this._movies = movies);
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
    // TODO: Handle errors
    //    -- Connection
    //    -- No files in library (prompt with "scan" button)
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