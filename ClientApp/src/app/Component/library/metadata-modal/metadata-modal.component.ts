import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-metadata-modal',
  templateUrl: './metadata-modal.component.html',
  styles: []
})
export class MetadataModalComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }
}
