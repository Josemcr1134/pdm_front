import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() limit: number = 10;
  @Input() offset: number = 0;
  @Input() totalItems: number = 0;
  @Output() onPageChange = new EventEmitter<number>();

  get currentPage(): number {
    return Math.floor(this.offset / this.limit) + 1;
  }

  nextPage(): void {
    this.offset += this.limit;
    this.onPageChange.emit(this.offset);
  }

  previousPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.onPageChange.emit(this.offset);
    }
  }
}
