import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() total: number;
  @Input() perPage: number;
  @Input() currentPage: number;
  @Output() pageChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  get max(): number {
    return this.currentPage >= this.total / this.perPage - 1 ? this.total : (this.currentPage + 1) * this.perPage;
  }

  nextPage(): void {
    if (this.currentPage < this.total / this.perPage - 1) {
      this.pageChange.emit(true);
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.pageChange.emit(false);
    }
  }

  constructor() { }

  ngOnInit() {
  }
}
