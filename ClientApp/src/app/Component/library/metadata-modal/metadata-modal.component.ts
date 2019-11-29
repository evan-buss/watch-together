import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { LibraryService, APIResult, MovieMetadata, MovieFile } from '../library.service';
import { tap } from 'rxjs/operators';
import { emit } from 'cluster';

@Component({
  selector: 'app-metadata-modal',
  templateUrl: './metadata-modal.component.html',
})
export class MetadataModalComponent implements OnInit, OnDestroy {
  @Input() selectedMovie: MovieFile;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() libraryUpdated: EventEmitter<MovieFile[]> = new EventEmitter<MovieFile[]>();
  title: string;
  year: string;
  results: APIResult = null;
  currentPage: number = 0;
  private errorString: string = "";

  // Handle various errors
  get errorMessage(): string {
    if (this.errorString !== "") {
      return this.errorString;
    } else if (this.results === null) {
      return "Search a movie to update metadata";
    } else if (this.results && this.results.total <= 0) {
      return "Search didn't return any results. Try again.";
    }
    return "";
  }

  constructor(private libraryService: LibraryService) { }

  search(): void {
    this.libraryService.searchQuery(this.title, this.year, this.currentPage)
      .subscribe(
        results => this.results = results,
        error => this.errorString = error
      );
  }

  updateMetadata(movie: MovieMetadata): void {
    this.libraryService.updateMovie(this.selectedMovie.id, movie)
      .subscribe(movies => this.libraryUpdated.emit(movies));
    this.close.emit(null);
  }

  handlePageChange(isNext: boolean): void {
    if (isNext) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    this.search();
  }

  ngOnInit() {
    window.addEventListener("keydown", (event) => this.handleEscapeKey(event));
  }

  ngOnDestroy() {
    window.removeEventListener("keydown", (event) => this.handleEscapeKey(event));
  }

  // Allow escape key to close the modal
  handleEscapeKey(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.close.emit(null);
    }
  }

  handleEnter(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.search();
    }
  }
}
