import { Component, EventEmitter, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { LibraryService, MovieMetadata, MovieFile } from '../library.service';

@Component({
  selector: 'app-metadata-modal',
  templateUrl: './metadata-modal.component.html',
})
export class MetadataModalComponent implements OnInit, OnDestroy {
  @Input() selectedMovie: MovieFile;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Output() libraryUpdated: EventEmitter<MovieFile[]> = new EventEmitter<MovieFile[]>();

  // Search Parameters
  title: string;
  year: string;

  results: MovieMetadata[] = null;
  currentPage: number = 0;
  private errorString: string = "";

  // Handle various errors
  get errorMessage(): string {
    if (this.errorString !== "") {
      return this.errorString;
    } else if (this.results === null) {
      return "Search a movie to update metadata";
    } else if (this.results && this.results.length <= 0) {
      return "Search didn't return any results. Try again.";
    }
    return "";
  }

  // Visible results provides a window that shows 10 results at a time. 
  // Increase the page number to step through
  get visibleResults(): MovieMetadata[] {
    return this.results.slice(this.currentPage * 10, this.currentPage * 10 + 10 + 1);
  }

  constructor(private libraryService: LibraryService) { }

  search(): void {
    this.libraryService.searchQuery(this.title, this.year)
      .subscribe(
        results => this.results = results,
        error => this.errorString = error
      );
  }

  clearMetadata(): void {
    this.libraryService.updateMovie(this.selectedMovie, null)
      .subscribe(movies => this.libraryUpdated.emit(movies));
  }

  updateMetadata(movie: MovieMetadata): void {
    this.libraryService.updateMovie(this.selectedMovie, movie)
      .subscribe(movies => this.libraryUpdated.emit(movies));
  }

  handlePageChange(isNext: boolean): void {
    if (isNext) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
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
