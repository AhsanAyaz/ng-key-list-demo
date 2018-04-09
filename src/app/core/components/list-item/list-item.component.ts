import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() item;
  @Output() itemSelected = new EventEmitter<any>();
  isActive: boolean;
  constructor() { }

  ngOnInit() {
    this.isActive = false;
  }

  setActive(val) {
    this.isActive = val;
  }

  selectItem() {
    this.itemSelected.emit(this.item);
  }

}
