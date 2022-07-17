import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crea-linea',
  templateUrl: './crea-linea.component.html',
  styleUrls: ['./crea-linea.component.css']
})
export class CreaLineaComponent implements OnInit {
  emisorFormGroup : boolean = true;
  receptorFormGroup: boolean = true;
  operacionFormGroup: boolean = true;
  saveInmemory: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
