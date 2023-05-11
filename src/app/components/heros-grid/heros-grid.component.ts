import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

// INTERFACES
import { Hero } from './../../interfaces/hero';

@Component({
  selector: 'app-heros-grid',
  templateUrl: './heros-grid.component.html',
  styleUrls: ['./heros-grid.component.scss']
})
export class HerosGridComponent implements OnChanges {

  @Input('heros') public heros!: Hero[];
  @Output('edit') public edit = new EventEmitter<Hero>();
  @Output('remove') public remove = new EventEmitter<Hero>();
  public currentPage: number = 1;
  public itemsPerPage: number = 8;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['heros']?.currentValue) this.currentPage = 1;
  }
}
