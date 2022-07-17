import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Constancia } from '../../../../model/constancia.model';
type TypeAction = 'modificada' | 'cancelada';

@Component({
  selector: 'app-content-cart',
  templateUrl: './content-cart.component.html',
  styleUrls: ['./content-cart.component.css']
})

export class ContentCartComponent implements OnInit {

  @Input() constancyList: Constancia[];
  @Input() action: TypeAction;
  @Output() deleteItem = new EventEmitter<any>();
  @Output() removeSession = new EventEmitter<string>();
  @Output() searchOutput = new EventEmitter<string>();
  @Output() listToProcess = new EventEmitter<string>();
  @Output() processItem = new EventEmitter<any>();
  searchField = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.searchField.valueChanges.subscribe(
      response => this.searchOutput.emit(response)
    );
  }



  deleteItemStorage(id: number | string) {
    this.deleteItem.emit({id, nameSession: this.action })
  }

  deleteList() {
    this.removeSession.emit(this.action);
  }

  processList() {
    this.listToProcess.emit(this.action);
  }

  processItemStorage(index: number, constancia: Constancia) {
    const dto = [
      {
        index,
        constancia,
        session: this.action
      }
    ];
    this.processItem.emit(dto);
  }
}
