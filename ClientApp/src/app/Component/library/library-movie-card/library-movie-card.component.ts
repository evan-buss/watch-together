import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieFile } from "../library.service";

@Component({
  selector: 'app-library-movie-card',
  templateUrl: './library-movie-card.component.html',
})
export class LibraryMovieCardComponent implements OnInit {
  isHover: boolean = false;
  filename: string;
  @Input() movie: MovieFile;
  @Output() play: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
    this.filename = this.movie.path.split("\\")
      .pop()
      .split("/")
      .pop();
    if (this.movie.metadata) {
      if (this.movie.metadata.summary.length > 130) {
        this.movie.metadata.summary = this.movie.metadata.summary.substring(0, 130) + "...";
      }
    }
  }
}



