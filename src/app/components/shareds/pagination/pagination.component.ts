import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input('length') public length: number;
  @Input('itemsPerPage') public itemsPerPage: number;
  @Input('currentPage') public currentPage: number;
  @Output('changePage') private changePage = new EventEmitter<number>();
  public totalPages: number;
  public buttons: number[];

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.length / this.itemsPerPage);
      this.buttons = Array(this.totalPages).fill(0).map((x, i) => i+1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['length']?.currentValue != this.length ||
      changes['itemsPerPage']?.currentValue != this.itemsPerPage) {
      this.totalPages = Math.ceil(this.length / this.itemsPerPage);
      this.buttons = Array(this.totalPages).fill(0).map((x, i) => i+1);
    }
  }

  public moveTo(page: number): void {
    this.changePage.emit(page);
  }

  public next(): void {
    this.changePage.emit(++this.currentPage);
  }

  public prev(): void {
    this.changePage.emit(--this.currentPage);
  }

}
