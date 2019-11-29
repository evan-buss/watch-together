import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LibraryService, APIResult } from '../library.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-metadata-modal',
  templateUrl: './metadata-modal.component.html',
})
export class MetadataModalComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
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


  handlePageChange(isNext: boolean): void {
    if (isNext) {
      this.currentPage++;
    } else {
      this.currentPage--;
    }
    this.search();
  }

  ngOnInit() {
  }
}
