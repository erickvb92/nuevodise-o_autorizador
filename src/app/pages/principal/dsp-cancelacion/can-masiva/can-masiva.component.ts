import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../../../common/constantes';

@Component({
  selector: 'app-can-masiva',
  templateUrl: './can-masiva.component.html',
  styleUrls: ['./can-masiva.component.css']
})
export class CanMasivaComponent implements OnInit {

  tipoLayoutMasivo = Constantes.LAYOUT_MASIVO_CANCELACION;

  constructor() { }

  ngOnInit(): void {
  }

}
