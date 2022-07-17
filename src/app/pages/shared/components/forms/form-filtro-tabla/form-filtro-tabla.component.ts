import { Component, OnInit, Input, Type, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-form-filtro-tabla',
  templateUrl: './form-filtro-tabla.component.html',
  styleUrls: ['./form-filtro-tabla.component.scss']
})
export class FormFiltroTablaComponent implements OnInit {
  @Input() _dataSource: any;
  @Input() _paginator: any;
  @Input() _rowsFilter:string[];
  @Output() changeEventInput = new EventEmitter<boolean>(false);
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      filter: ['']
    });
  }

  ngOnInit(): void {
    this._dataSource.filterPredicate = (dataRow: any, filter: string) => {
      let isFound = false;
      this._rowsFilter.forEach(row => {
        if(!isFound) {
          isFound = dataRow[row].toLowerCase().includes(filter);
        }
      })
      return isFound;
    }
    this.filterField.valueChanges.pipe(
      debounceTime(600))
      .subscribe((termino:string) => {
        this.applyFilter(termino);
        this.changeEventInput.emit(true);
    });
  }

  applyFilter(termino: string) {
    const filterValue = termino === null ? '' : termino;
    this._dataSource.filter = filterValue.trim().toLowerCase();
    this._dataSource.paginator =this._paginator;
  }

  get filterField() {
    return this.searchForm.controls['filter'];
  }
}
