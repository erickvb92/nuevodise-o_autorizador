import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../../../common/constantes';

@Component({
  selector: 'app-crea-masiva',
  templateUrl: './crea-masiva.component.html',
  styleUrls: [`./crea-masiva.component.css`],
})
export class CreaMasivaComponent implements OnInit {

  tipoLayoutMasivo = Constantes.LAYOUT_MASIVO_CARGA;
  
  constructor() { }
  
  ngOnInit(): void {}

}
