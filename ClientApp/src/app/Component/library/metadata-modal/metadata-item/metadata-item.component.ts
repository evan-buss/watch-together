import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieMetadata } from '../../library.service';

@Component({
  selector: 'app-metadata-item',
  templateUrl: './metadata-item.component.html',
})
export class MetadataItemComponent implements OnInit {

  @Input() movie: MovieMetadata;
  @Input() alternate: boolean;
  @Output() update: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
